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
    this.collection.update({ userid, boardId }, { userid, boardId }, { upsert: true })
  }

  public async removeFavoriteBoard(userid: string, boardId: string): Promise<void> {
    await this.remove({ userid, boardId })
  }

  public async getFavoriteBoards(userid: string) {
    const favoriteBoardRecords = (await this.collection
      .find({ userid })
      .fetchAsync()) as BoardFavoriteRecord[]
    const favoriteBoardIds = favoriteBoardRecords.map(
      (record: BoardFavoriteRecord) => record.boardId
    )
    const favoriteBoards = (await this.collection
      .find({ _id: { $in: favoriteBoardIds } })
      .fetchAsync()) as BoardRecord[]

    return favoriteBoards as BoardRecord[]
  }
}
