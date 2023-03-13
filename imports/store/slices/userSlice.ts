import { StoreMethod, StoreSetter } from '../types'

export interface IUser {
  _id: string
  username: string
  avatarUrl: string
}

export interface IUserStore {
  user: IUser
  setUser: StoreMethod<IUser>
  setUsername: StoreMethod<IUser['username']>
  setAvatarUrl: StoreMethod<IUser['avatarUrl']>
}

export const createUserSlice = (set: StoreSetter<Pick<IUserStore, 'user'>>) => ({
  user: { _id: '', username: '', avatarUrl: '' },
  setUser: (user: IUser) => set({ user }),
  setUsername(username: string) {
    return set(state => ({
      user: {
        ...state.user,
        username
      }
    }))
  },
  setAvatarUrl(avatarUrl: string) {
    return set(state => ({
      user: {
        ...state.user,
        avatarUrl
      }
    }))
  }
})
