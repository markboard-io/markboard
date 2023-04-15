import { BaseCollection } from './BaseCollection'
import { Meteor } from 'meteor/meteor'
import { BoardRecord } from './BoardCollection'

export interface IBoardFavoriteRecord {
  _id: string
  userid: string
  boardId: string
  created_at: number
  last_updated: number
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
  public async getBoardById(boardId: string): Promise<BoardRecord | null> {
    const document = await this.collection.findOneAsync({ boardId: boardId })
    if (document != null) Object.assign(document, { id: document._id })
    return document as BoardRecord
  }

  public async getFavoriteBoards(userid: string): Promise<IBoardFavoriteRecord[]> {
    try {
      const query = { userid }
      const lastCreatedSortTop = { created_at: -1 }
      const favoriteBoards = this.collection
        .find(query, { sort: lastCreatedSortTop })
        .fetchAsync() as Promise<IBoardFavoriteRecord[]>
      return favoriteBoards
    } catch (err) {
      console.error(`Error getting favorite boards for user ${userid}:`, err)
      throw new Meteor.Error(`Failed to get favorite boards for user ${userid}`)
    }
  }
}

export const BoardFavoritesCollection = new BoardFavoritesCollectionClass()
