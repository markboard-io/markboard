import { Meteor } from 'meteor/meteor'
import {
  ChatGPTCollection,
  ChatGPTSessionRecord,
  IChatGPTMessage,
  IChatGPTSession
} from '../models'
import { BaseService } from './BaseService'
import { ChatGPTAPI } from 'chatgpt'

export class ChatGPTService extends BaseService {
  private _chatGPTAPI: ChatGPTAPI | undefined

  constructor() {
    super('chatGPT')
    if (process.env.CHATGPT_API_KEY !== undefined) {
      this._chatGPTAPI = new ChatGPTAPI({
        apiKey: process.env.CHATGPT_API_KEY,
        completionParams: {
          temperature: 0.5,
          top_p: 0.8
        }
      })
    }
  }

  public startup(): void {}

  public async saveChatGPTSession(
    chatGPTSession: IChatGPTSession & Pick<ChatGPTSessionRecord, '_id'>
  ) {
    const userid = Meteor.userId()
    if (userid != null) {
      const count = await ChatGPTCollection.updateChatGPTSession(chatGPTSession)
      return count == 1
    }
    throw new Meteor.Error('Unauthorized')
  }

  public async getChatGPTSessionByBoardId(boardId: string): Promise<ChatGPTSessionRecord | null> {
    const userid = Meteor.userId()
    if (userid != null) {
      const chatGPTSessionRecord = await ChatGPTCollection.getChatGPTSessionByBoardId(boardId)
      return chatGPTSessionRecord
    }
    throw new Meteor.Error('Unauthorized')
  }

  public async sendMessageToChatGPTWithoutContext(message: string): Promise<string> {
    if (this._chatGPTAPI === undefined) {
      throw new Meteor.Error('ChatGPT API Key not set succeed')
    }
    const response = await this._chatGPTAPI.sendMessage(message)
    return response.text
  }

  public async sendMessageToChatGPTWithContext(
    boardid: string,
    message: string,
    model = 'gpt-3.5-turbo'
  ): Promise<string> {
    const record = await this.getChatGPTSessionByBoardId(boardid)
    if (record === null) {
      throw new Meteor.Error('ChatGPTSession not found')
    }
    if (this._chatGPTAPI === undefined) {
      throw new Meteor.Error('ChatGPT API Key not set succeed')
    }
    let response
    if (record.currentParentMessageId === undefined) {
      response = await this._chatGPTAPI.sendMessage(message)
    }
    response = await this._chatGPTAPI.sendMessage(message, {
      parentMessageId: record.currentParentMessageId
    })
    const userMsg = {
      role: 'user',
      content: message
    } as IChatGPTMessage
    const assistantMsg = {
      role: 'assistant',
      content: response.text
    } as IChatGPTMessage
    record.messages.push(userMsg, assistantMsg)
    record.currentParentMessageId = response.id
    record.model = model
    await ChatGPTCollection.updateChatGPTSession(record)
    return response.text
  }
}
