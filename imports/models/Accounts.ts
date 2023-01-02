import { Accounts as MeteorAccounts } from 'meteor/accounts-base'

export interface IUserCreation {
  username: string
  email: string
  password: string
}

export class Accounts {
  static createUser(user: IUserCreation): Promise<boolean> {
    return new Promise((resolve, reject) => {
      MeteorAccounts.createUser(user, error => {
        if (error) return reject(error)
        return resolve(true)
      })
    })
  }

  static checkUsernameAvailability(username: string): boolean {
    const user = MeteorAccounts.findUserByUsername(username)
    return !user
  }
}