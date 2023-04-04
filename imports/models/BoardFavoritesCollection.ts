import { BaseCollection } from './BaseCollection'
import { BoardRecord } from './BoardCollection'
import { Meteor } from 'meteor/meteor'

export interface BoardFavoriteRecord {
  userid: string
  boardId: string
}

export class BoardFavoritesCollection extends BaseCollection<BoardFavoriteRecord> {
  constructor() {
    super('board_favorites')
  }

  public async addFavoriteBoard(userid: string, boardId: string): Promise<BoardFavoriteRecord> {
    const query = { userid, boardId }
    const update = { $set: { userid, boardId } }
    const result = await this.collection.upsertAsync(query, update)
    if (result && result.numberAffected && result.numberAffected > 0) {
      const newRecord = { userid, boardId }
      return newRecord
    } else {
      throw new Meteor.Error(`Failed to add favorite board for user ${userid} and board ${boardId}`)
    }
  }

  public async removeFavoriteBoard(userid: string, boardId: string): Promise<boolean> {
    const query = { userid, boardId }
    const result = await this.collection.removeAsync(query)
    return result > 0
  }

  public async getFavoriteBoards(userid: string): Promise<BoardRecord[]> {
    try {
      const favoriteBoardRecords = (await this.collection
        .find({ userid })
        .fetchAsync()) as BoardFavoriteRecord[]
      const favoriteBoardIds = favoriteBoardRecords.map(({ boardId }) => boardId)
      const favoriteBoards = (await this.collection
        .find({ _id: { $in: favoriteBoardIds } })
        .fetchAsync()) as BoardRecord[]

      return favoriteBoards
    } catch (err) {
      console.error(`Error getting favorite boards for user ${userid}:`, err)
      throw new Meteor.Error(`Failed to get favorite boards for user ${userid}`)
    }
  }
}
