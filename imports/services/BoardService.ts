import { IBoard } from '../excalidraw/types'
import { BoardCollection, BoardRecord } from '../models'
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

  public async saveBoard(board: IBoard & Pick<BoardRecord, '_id'>) {
    const userid = Meteor.userId()
    if (userid != null) {
      const count = await BoardCollection.updateBoard(board)
      return count == 1
    }
    throw new Meteor.Error('Unauthorized')
  }
}
