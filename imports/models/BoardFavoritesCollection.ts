import { BaseCollection } from './BaseCollection'

export interface BoardFavoriteRecord {
  userid: string,
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

  public async getFavoriteBoards(userid: string): Promise<BoardFavoriteRecord[]> {
    return this.collection.find({ userid: userid }).fetchAsync() as Promise<BoardFavoriteRecord[]>
  }
}
