import { AppStateCollection } from '../models'
import { BaseService } from './BaseService'
import { Meteor } from 'meteor/meteor'

export class AppService extends BaseService {
  constructor() {
    super('app')
  }

  public startup(): void {}

  public getAppState() {
    const userid = Meteor.userId()
    if (userid != null) {
      return AppStateCollection.getAppState(userid)
    }
    throw new Meteor.Error('Unauthorized')
  }
}
