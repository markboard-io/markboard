import { StoreMethod, StoreSetter } from '../types'

export interface IUser {
  _id: string
  username: string
}

export interface IUserStore {
  user: IUser
  setUser: StoreMethod<IUser>
  setUsername: StoreMethod<IUser['username']>
}

export const createUserSlice = (set: StoreSetter<Pick<IUserStore, 'user'>>) => ({
  user: { _id: '', username: '' },
  setUser: (user: IUser) => set({ user }),
  setUsername(username: string) {
    return set(state => ({
      user: {
        ...state.user,
        username
      }
    }))
  }
})
