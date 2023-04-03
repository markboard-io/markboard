import { BaseCollection } from './BaseCollection'
import { BoardRecord } from './BoardCollection'

export interface BoardFavoriteRecord {
  userid: string
  boardId: string
}

export class BoardFavoritesCollection extends BaseCollection<BoardFavoriteRecord> {
  constructor() {
    super('board_favorites')
  }

  public async addFavoriteBoard(userid: string, boardId: string): Promise<boolean> {
    try {
      this.collection.update({ userid, boardId }, { userid, boardId }, { upsert: true })
      return true
    } catch (err) {
      console.error('Error adding board to favorites:', err)
      return false
    }
  }

  public async removeFavoriteBoard(userid: string, boardId: string): Promise<boolean> {
    try {
      this.remove({ userid, boardId })
      return true
    } catch (err) {
      console.error('Error removing board from favorites:', err)
      return false
    }
  }
  public async getFavoriteBoards(userid: string) {
    const favoriteBoardRecords = (await this.collection
      .find({ userid })
      .fetchAsync()) as BoardFavoriteRecord[]
    const favoriteBoardIds = favoriteBoardRecords.map(boardId => boardId)
    const favoriteBoards = (await this.collection
      .find({ _id: { $in: favoriteBoardIds } })
      .fetchAsync()) as BoardRecord[]

    return favoriteBoards as BoardRecord[]
  }
}
