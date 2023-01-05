import { Accounts as MeteorAccounts } from 'meteor/accounts-base'

export interface IUserCreation {
  username: string
  email: string
  password: string
}

class AccountCollection {
  public createUser(user: IUserCreation): Promise<boolean> {
    return new Promise((resolve, reject) => {
      MeteorAccounts.createUser(user, error => {
        if (error) return reject(error)
        return resolve(true)
      })
    })
  }

  public checkUsernameAvailability(username: string): boolean {
    const user = MeteorAccounts.findUserByUsername(username)
    return !user
  }

  public checkEmailAvailability(email: string): boolean {
    const user = MeteorAccounts.findUserByEmail(email)
    return !user
  }
}

export const AccountModel = new AccountCollection()
