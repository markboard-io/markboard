import { IBoard } from '../excalidraw/types'
import { BoardFavoritesCollection } from '../models'
import { Collections } from '../models/Collections'
import { BaseService } from './BaseService'
import { Meteor } from 'meteor/meteor'
import { _makeBoard, _makeBoards } from '../utils/boards'

export interface IBoardFilterOptions {
  keys?: (keyof IBoard)[]
  favorite?: boolean
}

export class BoardFavoriteService extends BaseService {
  constructor() {
    super('board_favorite')
  }

  public startup(): void {
    Meteor.publish(Collections.names.board_favorites, () => {
      const userid = Meteor.userId()
      if (userid != null) {
        return BoardFavoritesCollection.raw.find({ userid })
      }
    })
  }
  public async getBoardById(boardId: string) {
    const userid = Meteor.userId()
    if (userid != null) {
      const record = await BoardFavoritesCollection.getBoardById(boardId)
      return record != null ? _makeBoard(record) : null
    }
    throw new Meteor.Error('Unauthorized')
  }

  public async starBoard(boardId: string): Promise<boolean> {
    const userId = Meteor.userId()
    if (userId != null) {
      return BoardFavoritesCollection.addFavoriteBoard(userId, boardId)
    } else {
      throw new Meteor.Error('Unauthorized')
    }
  }

  public cancelStarBoard(boardId: string): Promise<boolean> {
    const userId = Meteor.userId()
    if (userId != null) {
      return BoardFavoritesCollection.removeFavoriteBoard(userId, boardId)
    } else {
      throw new Meteor.Error('Unauthorized')
    }
  }

  public async isBoardFavorite(boardId: string): Promise<boolean> {
    const userId = Meteor.userId()
    if (userId != null) {
      return BoardFavoritesCollection.isFavoriteBoard(userId, boardId)
    } else {
      throw new Meteor.Error('Unauthorized')
    }
  }

  public async getMyFavoriteBoard(): Promise<IBoard[]> {
    const userid = Meteor.userId()
    if (userid != null) {
      const favoriteBoardRecords = (await BoardFavoritesCollection.getFavoriteBoards(userid)) ?? []
      const favoriteBoards = await Promise.all(
        favoriteBoardRecords.map(async record => {
          const board = await this.getBoardById(record.boardId)
          return board
        })
      )
      return favoriteBoards.filter(board => board != null) as IBoard[]
    } else {
      throw new Meteor.Error('Unauthorized')
    }
  }
}
