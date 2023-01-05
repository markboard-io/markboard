import { BaseService } from './BaseService'
import { AccountModel } from '../models'

export class AccountService extends BaseService {
  constructor() {
    super('account')
  }

  public startup(): void {}

  public checkUsernameAvailability(username: string) {
    return AccountModel.checkUsernameAvailability(username)
  }

  public checkEmailAvailability(email: string) {
    return AccountModel.checkEmailAvailability(email)
  }
}
