import { BaseCollection } from './BaseCollection'

export type RocketChatUserRecord = {
  _id: string
  userId: string
  authToken: string
  token: string
}

export class RocketChatCollectionClass extends BaseCollection<RocketChatUserRecord> {
  constructor() {
    super('rocketChat')
  }
  public async getRocketChatUserByToken(token: string): Promise<RocketChatUserRecord | null> {
    const document = await this.collection.findOneAsync({ token })
    if (document != null) Object.assign(document, { id: document._id })
    return document as RocketChatUserRecord
  }
  public async getRocketChatUserByUserId(userId: string): Promise<RocketChatUserRecord | null> {
    const document = await this.collection.findOneAsync({ userId })
    if (document != null) Object.assign(document, { id: document._id })
    return document as RocketChatUserRecord
  }
}
