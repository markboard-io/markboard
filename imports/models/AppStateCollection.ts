import { BaseCollection } from './BaseCollection'

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
    return this.collection.insertAsync({ userid, currentBoardId: boardId })
  }

  public getAppState(userid: string) {
    return this.collection.findOneAsync({ userid }) as Promise<AppStateRecord | null>
  }
}

export const AppStateCollection = new AppStateCollectionClass()
