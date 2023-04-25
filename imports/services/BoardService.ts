import { IBoard } from '../excalidraw/types'
import { BoardCollection} from '../models'
import { Collections } from '../models/Collections'
import { BaseService } from './BaseService'
import { Meteor } from 'meteor/meteor'
import { _makeBoard, _makeBoards } from '../utils/boards'

export interface IBoardFilterOptions {
  keys?: (keyof IBoard)[]
}

export class BoardService extends BaseService {
  constructor() {
    super('board')
  }

  public startup(): void {
    Meteor.publish(Collections.names.boards, () => {
      const userid = Meteor.userId()
      if (userid != null) {
        return BoardCollection.raw.find({ userid })
      }
    })
  }

  public getLastCreatedBoard() {
    const userid = Meteor.userId()
    if (userid != null) {
      return BoardCollection.getLastCreatedBoard(userid)
    }
    throw new Meteor.Error('Unauthorized')
  }

  public async saveBoard(board: IBoard) {
    const userid = Meteor.userId()
    if (userid != null) {
      const count = await BoardCollection.updateBoard(board)
      return count == 1
    }
    console.error('Unauthorized')
    throw new Meteor.Error('Unauthorized')
  }
  public async getMyBoards(options?: IBoardFilterOptions): Promise<IBoard[]> {
    const userId = Meteor.userId()
    if (!userId) {
      return []
    }
    const boardRecords = (await BoardCollection.getMyBoards(userId)) ?? []
    const boards = boardRecords.map(record => _makeBoard(record, options))
    return boards
  }

  public async getBoardById(boardId: string) {
    const userid = Meteor.userId()
    if (userid != null) {
      const record = await BoardCollection.getBoardById(boardId)
      return record != null ? _makeBoard(record) : null
    }
    throw new Meteor.Error('Unauthorized')
  }

  public async createNewBoard(): Promise<string> {
    const userid = Meteor.userId()
    if (userid != null) {
      return BoardCollection.createNewBoard(userid)
    }
    throw new Meteor.Error('Unauthorized')
  }

  public async changeBoardTitle(boardId: string, title: string) {
    const userid = Meteor.userId()
    if (userid != null) {
      return BoardCollection.updateBoardById(boardId, { title })
    }
    throw new Meteor.Error('Unauthorized')
  }
}
