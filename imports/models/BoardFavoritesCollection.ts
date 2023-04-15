import { BaseCollection } from './BaseCollection'
import { Meteor } from 'meteor/meteor'
import { BoardRecord } from './BoardCollection'

export interface IBoardFavoriteRecord {
  _id: string
  userid: string
  boardId: string
  last_updated: number
}

export class BoardFavoritesCollectionClass extends BaseCollection<IBoardFavoriteRecord> {
  constructor() {
    super('board_favorites')
  }

  public async addFavoriteBoard(board: BoardRecord | null, userid: string): Promise<boolean> {
    const { id, title, files, elements } = board ?? {}
    const values = { userid: userid, files, title, elements, last_updated: Date.now() }
    const result = await this.collection.upsertAsync({_id:id}, { $set: values })
    if (result && result.numberAffected && result.numberAffected > 0) {
      return result?.numberAffected > 0
    } else {
      throw new Meteor.Error(`Failed to add favorite board for user and board ${id}`)
    }
  }

  public async removeFavoriteBoard(userid: string, boardId: string): Promise<boolean> {
    const query = { userid, boardId }
    const result = await this.collection.removeAsync(query)
    return result > 0
  }

  public async isFavoriteBoard(userid: string, _id: string): Promise<boolean> {
    const query = { userid, _id }
    const result = await this.collection.findOneAsync(query)
    return result != null
  }
  public async getBoardById(boardId: string): Promise<BoardRecord | null> {
    const document = await this.collection.findOneAsync({ _id: boardId })
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
