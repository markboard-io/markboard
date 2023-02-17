import { create } from 'zustand'
import { IUserStore, createUserSlice, IAppStore, createAppSlice } from './slices'

export type Store = IUserStore & IAppStore

export const useStore = create<Store>((set: any) => ({
  ...createUserSlice(set),
  ...createAppSlice(set)
}))
