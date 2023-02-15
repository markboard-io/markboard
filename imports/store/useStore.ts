import { create } from 'zustand'
import { IUserStore, createUserSlice } from './userSlice'

export type Store = IUserStore

export const useStore = create<Store>((set: any) => ({
  ...createUserSlice(set)
}))
