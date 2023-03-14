import { Meteor } from 'meteor/meteor'
import {
  ChatGPTCollection,
  ChatGPTSessionRecord,
  IChatGPTMessage,
  IChatGPTSession
} from '../models'
import { BaseService } from './BaseService'
import { ChatGPTAPI } from 'chatgpt'

export type ChatGPTResponse = {
  content: string
  parentMessageId?: string
}

export class ChatGPTService extends BaseService {
  private _chatGPTAPI?: ChatGPTAPI

  constructor() {
    super('chatGPT')
    if (process.env.CHATGPT_API_KEY) {
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

  public async saveChatGPTSession(boardId: string, chatGPTSession: IChatGPTSession) {
    const userid = Meteor.userId()
    if (userid != null) {
      const count = await ChatGPTCollection.updateChatGPTSession(boardId, chatGPTSession)
      return count == 1
    }
    throw new Meteor.Error('Unauthorized')
  }

  public async getChatGPTSessionByBoardId(boardId: string): Promise<ChatGPTSessionRecord | null> {
    const userid = Meteor.userId()
    if (userid != null) {
      return ChatGPTCollection.getChatGPTSessionByBoardId(boardId)
    }
    throw new Meteor.Error('Unauthorized')
  }

  public async sendMessageToChatGPTWithContext(
    boardId: string,
    message: string,
    model?: string,
    parentMessageId?: string
  ): Promise<ChatGPTResponse> {
    const record = await this.getChatGPTSessionByBoardId(boardId)
    if (record == null) {
      throw new Meteor.Error('ChatGPTSession not found')
    }
    if (this._chatGPTAPI == null) {
      throw new Meteor.Error('ChatGPT API Key not set succeed')
    }

    let response
    if (!parentMessageId) {
      response = await this._chatGPTAPI.sendMessage(message, {
        parentMessageId
      })
    } else {
      const historyMessages = await ChatGPTCollection.getUserHistoryMessages(boardId)
      if (message.length) {
        response = await this._chatGPTAPI.sendMessage(historyMessages)
      } else {
        response = await this._chatGPTAPI.sendMessage(message)
      }
    }

    const userMsg = {
      role: 'user',
      content: message
    } as IChatGPTMessage
    const assistantMsg = {
      role: 'assistant',
      content: response.text
    } as IChatGPTMessage
    const messages = [userMsg, assistantMsg]
    record.model = model

    await ChatGPTCollection.addMessagesToChatGPTSession(boardId, messages)

    return {
      content: response.text,
      parentMessageId: response.parentMessageId
    }
  }
}
