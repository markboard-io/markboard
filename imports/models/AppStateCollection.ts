import { BaseCollection } from './BaseCollection'
import { BoardCollection } from './BoardCollection'

export interface IAppState {
  currentBoardId: string
}

export type AppStateRecord = IAppState & {
  userid: string
}

export class AppStateCollectionClass extends BaseCollection<AppStateRecord> {
  constructor() {
    super('appState')
    this.attachSchema({
      userid: String,
      currentBoardId: String
    })
  }

  public setCurrentBoardId(userid: string, boardId: string) {
    return this.collection.upsertAsync({ userid }, { $set: { currentBoardId: boardId } })
  }

  public async getAppState(userid: string) {
    let state = await this.collection.findOneAsync({ userid })
    if (state == null) {
      const { _id: boardId } = await BoardCollection.getLastCreatedBoard(userid)
      await this.setCurrentBoardId(userid, boardId)
      state = await this.collection.findOneAsync({ userid })
    }
    return state as Promise<AppStateRecord>
  }
}

export const AppStateCollection = new AppStateCollectionClass()
