import { BaseCollection } from './BaseCollection'

export type RocketChatUserRecord = {
  _id: string
  userId: string
  username: string
  boardname: string
}

export class RocketChatCollectionClass extends BaseCollection<RocketChatUserRecord> {
  constructor() {
    super('rocketChat')
  }

  public async createRocketChatBoard(
    userId: string,
    username: string,
    boardname: string
  ): Promise<number> {
    const board = this.generateEmptyBoard(username, userId, boardname)
    const result = await this.collection.updateAsync(
      board,
      {
        $set: board
      },
      {
        upsert: true
      }
    )

    return result
  }

  private generateEmptyBoard(userId: string, username: string, boarname: string) {
    return {
      userId: userId,
      username: username,
      title: boarname,
      created_at: Date.now(),
      last_updated: Date.now(),
      elements: [],
      files: {}
    }
  }
}

export const RocketChatCollection = new RocketChatCollectionClass()
