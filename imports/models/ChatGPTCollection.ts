import { BaseCollection } from './BaseCollection'

export type IChatGPTMessage = {
  role: string
  content: string
  ts: number
}

export interface IChatGPTSession {
  model?: string
  messages: IChatGPTMessage[]
}

export type ChatGPTSessionRecord = IChatGPTSession & {
  _id: string
  boardId: string
  created_at: number
  last_updated: number
}

export class ChatGPTCollectionClass extends BaseCollection<ChatGPTSessionRecord> {
  constructor() {
    super('chatGPTSessions')
  }

  public async getChatGPTSessionByBoardId(boardId: string): Promise<ChatGPTSessionRecord | null> {
    const session = await this.collection.findOneAsync({ boardId })
    if (session == null) {
      const _id = await this.collection.insertAsync(this.generateEmptyChatGPTSession(boardId))
      return this.collection.findOneAsync({ _id }) as Promise<ChatGPTSessionRecord>
    }

    return session as ChatGPTSessionRecord
  }

  public async updateChatGPTSession(boardId: string, session: IChatGPTSession) {
    const { model, messages } = session
    const values = { model, messages, last_updated: Date.now() }

    return this.collection.updateAsync({ boardId }, { $set: values })
  }

  private generateEmptyChatGPTSession(boardId: string): Omit<ChatGPTSessionRecord, '_id'> {
    return {
      boardId,
      created_at: Date.now(),
      last_updated: Date.now(),
      messages: []
    }
  }

  public async addMessagesToChatGPTSession(boardId: string, messages: IChatGPTMessage[]) {
    return this.collection.updateAsync({ boardId }, { $push: { messages: { $each: messages } } })
  }

  public async getUserHistoryMessages(boardId: string): Promise<string> {
    const session = await this.getChatGPTSessionByBoardId(boardId)

    if (session) {
      const longString = session.messages.map(message => message.content).join(' ')
      let tokens = longString.split(' ')

      //set MAX TOKEN = 3000, the max limit of open ai about gpt-3.5-turo is 4096
      if (tokens.length > 3000) {
        tokens.slice(tokens.length - 3000, tokens.length)
      }
      return tokens.join(' ')
    }
    return ''
  }
}

export const ChatGPTCollection = new ChatGPTCollectionClass()
