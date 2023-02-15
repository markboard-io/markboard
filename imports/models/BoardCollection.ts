import { AppStateCollection } from './AppStateCollection'
import { BaseCollection } from './BaseCollection'
import type { IBoard } from '/imports/excalidraw/types'

export type BoardRecord = IBoard & {
  _id: string
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

  public async getLastCreatedBoard(userid: string): Promise<BoardRecord> {
    const documents = await this.collection
      .find({ userid }, { sort: { created_at: -1 }, limit: 1 })
      .fetchAsync()
    if (!documents.length) {
      const _id = await this.collection.insertAsync(this.generateEmptyBoard(userid))
      await AppStateCollection.setCurrentBoardId(userid, _id)
      return this.collection.findOneAsync({ _id }) as Promise<BoardRecord>
    }
    return documents[0] as BoardRecord
  }

  private generateEmptyBoard(userid: string): Omit<BoardRecord, '_id'> {
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
