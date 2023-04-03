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

  public async addFavoriteBoard(userid: string, boardId: string): Promise<void> {
    await this.insert({ userid, boardId })
  }

  public async removeFavoriteBoard(userid: string, boardId: string): Promise<void> {
    await this.remove({ userid, boardId })
  }

  public async getFavoriteBoards(userid: string) {
    const favoriteBoardRecords = this.collection.find({ userid })
    const favoriteBoardIds = favoriteBoardRecords.map((record: any) => record.boardId)
    const favoriteBoards = (await this.collection
      .find({ _id: { $in: favoriteBoardIds } })
      .fetchAsync()) as BoardRecord[]
    return favoriteBoards
  }
}
