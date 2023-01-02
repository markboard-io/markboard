import { Meteor } from 'meteor/meteor'
import type { IUserCreation } from '/imports/models'
import { Accounts } from '/imports/models'
import { IMeteorCallResp } from './types'

export interface IUserCreationResp extends IMeteorCallResp {
  field?: 'email' | 'username' | 'confirm-password'
}

export function startAccountService() {
  Meteor.methods({
    'accounts.createUser': async (user: IUserCreation): Promise<IUserCreationResp> => {
      const isUsernameAvailable = Accounts.checkUsernameAvailability(user.username)
      if (!isUsernameAvailable) {
        return { field: 'username', error: 'Username is unavailable, please type a different one.' }
      }
      try {
        await Accounts.createUser(user)
      } catch (error) {
        // TODO handle error here
      }
      return { error: '' }
    }
  })
}