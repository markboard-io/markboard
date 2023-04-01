import { create } from 'zustand'
import {
  IUserStore,
  createUserSlice,
  IAppStore,
  createAppSlice,
  createBoardSlice,
  IBoardStore
} from './slices'

export type Store = IUserStore & IAppStore & IBoardStore

export const useStore = create<Store>((set: any) => ({
  ...createUserSlice(set),
  ...createAppSlice(set),
  ...createBoardSlice(set)
}))
