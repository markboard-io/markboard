import { IBoard } from '../excalidraw/types'
import { BoardCollection, BoardRecord } from '../models'
import { Collections } from '../models/Collections'
import { BaseService } from './BaseService'
import { Meteor } from 'meteor/meteor'

export interface IBoardFilterOptions {
  keys?: (keyof IBoard)[]
  favorite?: boolean
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
    throw new Meteor.Error('Unauthorized')
  }

  public async getBoardById(boardId: string) {
    const userid = Meteor.userId()
    if (userid != null) {
      const record = await BoardCollection.getBoardById(boardId)
      return record != null ? this._makeBoard(record) : null
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

  private _makeBoard(record: BoardRecord, options?: IBoardFilterOptions): IBoard {
    const { _id: id, title, elements, files } = record
    const board = { id, title, elements, files }

    if (options != null && Array.isArray(options.keys)) {
      return Object.entries(board).reduce((o, [key, value]) => {
        if (options.keys!.includes(key as keyof IBoard)) {
          o[key] = value
        }
        return o
      }, {} as Record<string, any>) as IBoard
    }
    return board
  }
}
