import { AppStateCollection } from './AppStateCollection'
import { BaseCollection } from './BaseCollection'
import type { IBoard } from '/imports/excalidraw/types'

export type BoardRecord = IBoard & {
  userid: string
  created_at: number
  last_updated: number
}

export class BoardCollectionClass extends BaseCollection<BoardRecord> {
  constructor() {
    super('boards')
    this.attachSchema({
      userid: String,
      created_at: Number,
      last_updated: Number,
      elements: Array,
      'elements.$': Object,
      files: Object
    })
  }

  public createBoard(board: BoardRecord) {
    this.insert(board)
  }

  public async getLastCreatedBoard(userid: string): Promise<BoardRecord> {
    const documents = await this.collection
      .find({ userid }, { sort: { created_at: -1 }, limit: 1 })
      .fetchAsync()
    if (!documents.length) {
      const _id = await this.insert(this.generateEmptyBoard(userid))
      await AppStateCollection.setCurrentBoardId(userid, _id)
      return this.collection.findOneAsync({ _id }) as Promise<BoardRecord>
    }
    return documents[0] as BoardRecord
  }

  private generateEmptyBoard(userid: string): BoardRecord {
    return {
      userid,
      created_at: Date.now(),
      last_updated: Date.now(),
      elements: [],
      files: {}
    }
  }
}

export const BoardCollection = new BoardCollectionClass()
