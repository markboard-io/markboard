import { BaseCollection } from './BaseCollection'
import { BoardRecord } from './BoardCollection'
import { Meteor } from 'meteor/meteor'

export interface IBoardFavoriteRecord {
  userid: string
  boardId: string
}

export class BoardFavoritesCollectionClass extends BaseCollection<IBoardFavoriteRecord> {
  constructor() {
    super('board_favorites')
  }

  public async addFavoriteBoard(userid: string, boardId: string): Promise<boolean> {
    const query = { userid, boardId }
    const update = { $set: { userid, boardId } }
    const result = await this.collection.upsertAsync(query, update)
    if (result && result.numberAffected && result.numberAffected > 0) {
      return result?.numberAffected > 0
    } else {
      throw new Meteor.Error(`Failed to add favorite board for user ${userid} and board ${boardId}`)
    }
  }

  public async removeFavoriteBoard(userid: string, boardId: string): Promise<boolean> {
    const query = { userid, boardId }
    const result = await this.collection.removeAsync(query)
    return result > 0
  }

  public async isFavoriteBoard(userid: string, boardId: string): Promise<boolean> {
    const query = { userid, boardId }
    const result = await this.collection.findOneAsync(query)
    return result != null
  }

  public async getFavoriteBoards(userid: string): Promise<BoardRecord[]> {
    try {
      const query = { userid }
      const lastCreatedSortTop = { created_at: -1 }
      const favoriteBoards = this.collection
        .find(query, { sort: lastCreatedSortTop })
        .fetchAsync() as Promise<BoardRecord[]>
      console.log('favoriteBoards', favoriteBoards)
      return favoriteBoards
    } catch (err) {
      console.error(`Error getting favorite boards for user ${userid}:`, err)
      throw new Meteor.Error(`Failed to get favorite boards for user ${userid}`)
    }
  }
}

export const BoardFavoritesCollection = new BoardFavoritesCollectionClass()
