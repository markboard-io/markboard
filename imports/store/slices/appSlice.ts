import { StoreMethod, StoreSetter } from '../types'
import type { IAppState } from '/imports/models/AppStateCollection'

export interface IAppStore {
  appState: IAppState
  setAppState: StoreMethod<IAppState>
}

export const createAppSlice = (set: StoreSetter<Pick<IAppStore, 'appState'>>) => ({
  appState: { currentBoardId: '' },
  setAppState: (appState: IAppState) => set({ appState })
})
