import { BaseCollection } from './BaseCollection'

export type IChatGPTMessage = {
  role: string
  content: string
}

export interface IChatGPTSession {
  model: string | undefined
  currentParentMessageId: string | undefined
  messages: IChatGPTMessage[]
}

export type ChatGPTSessionRecord = IChatGPTSession & {
  _id: string
  boardid: string
  created_at: number
  last_updated: number
}

export class ChatGPTCollectionClass extends BaseCollection<ChatGPTSessionRecord> {
  constructor() {
    super('chatGPTSessions')
  }

  public async getChatGPTSessionByBoardId(boardid: string): Promise<ChatGPTSessionRecord | null> {
    const sessions = await this.collection.findOneAsync({ boardid })
    if (sessions === undefined) {
      const _id = await this.collection.insertAsync(this.generateEmptyChatGPTSession(boardid))
      return this.collection.findOneAsync({ _id }) as Promise<ChatGPTSessionRecord>
    }

    return sessions[0] as ChatGPTSessionRecord
  }

  public async updateChatGPTSession(session: IChatGPTSession & Pick<ChatGPTSessionRecord, '_id'>) {
    const { _id, model, messages, currentParentMessageId } = session
    const values = { model, messages, currentParentMessageId, last_updated: Date.now() }

    return this.collection.updateAsync({ _id }, { $set: values })
  }

  private generateEmptyChatGPTSession(boardid: string): Omit<ChatGPTSessionRecord, '_id'> {
    return {
      boardid,
      created_at: Date.now(),
      last_updated: Date.now(),
      model: undefined,
      currentParentMessageId: undefined,
      messages: []
    }
  }
}

export const ChatGPTCollection = new ChatGPTCollectionClass()
