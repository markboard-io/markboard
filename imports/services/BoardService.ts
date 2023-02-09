import { BoardCollection } from '../models'
import { BaseService } from './BaseService'
import { Meteor } from 'meteor/meteor'

export class BoardService extends BaseService {
  constructor() {
    super('board')
  }

  public startup(): void {}

  public getLastCreatedBoard() {
    const userid = Meteor.userId()
    if (userid != null) {
      return BoardCollection.getLastCreatedBoard(userid)
    }
    throw new Meteor.Error('Unauthorized')
  }
}
