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
  ): Promise<string> {
    const board = this.generateEmptyBoard(username, userId, boardname)
    const ifBoardExists = await this.getRocketChatBoard(userId, username, boardname)
    
    if (ifBoardExists == undefined) {
      try {
        await this.collection.insertAsync(board)
        return 'success' 
      } catch (error) {
        console.error('Error inserting board:', error)
        return 'error'
      }
    } else {
      return ifBoardExists._id
    }
  }
  
  public async deleteRocketChatBoard(
    userId: string,
    username: string,
    boardname: string
  ): Promise<number> {
    const board = this.getRocketChatBoard(userId, username, boardname)
    const result = await this.collection.removeAsync(board)
    return result
  }

  public async getRocketChatBoard( 
    userId: string,
    username: string,
    boardname: string
  ): Promise<RocketChatUserRecord | null> {
    const document = await this.collection.findOneAsync({ _id: boardname, userId: userId, username: username })
    return document as RocketChatUserRecord
  }

  private generateEmptyBoard(userId: string, username: string, boardname: string) {
    return {
      _id: boardname,
      username: username,
      userId: userId,
      title: boardname,
      created_at: Date.now(),
      last_updated: Date.now(),
      elements: [],
      files: {}
    }
  }
}

export const RocketChatCollection = new RocketChatCollectionClass()
