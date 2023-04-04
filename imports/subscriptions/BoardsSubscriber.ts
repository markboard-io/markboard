import { Meteor } from 'meteor/meteor'
import { Collections } from '/imports/models/Collections'
import { IBoard } from '../excalidraw/types'
import { BoardCollection, BoardRecord } from '../models'
import { IBoardFilterOptions } from '../services/BoardService'
import { useEffect } from 'react'
import { globalEventEmitter } from '../utils'
import { attachDebugLabel } from '/imports/store'
import { atom, useAtom } from 'jotai'

export enum BoardEvents {
  FavoritesChanged = 'BoardEvents_FavoritesChanged',
  PrivateChanged = 'BoardEvents_PrivateChanged'
}

export const privateBoardsAtom = attachDebugLabel(atom<IBoard[]>([]), 'privateBoardsAtom')
export const favoriteBoardsAtom = attachDebugLabel(atom<IBoard[]>([]), 'favoriteBoardsAtom')

export function usePrivateBoards() {
  const [boards, setBoards] = useAtom(privateBoardsAtom)

  useEffect(() => {
    const onBoardsChanged = (boards: IBoard[]) => setBoards(boards)
    globalEventEmitter.on(BoardEvents.PrivateChanged, onBoardsChanged)
    return () => globalEventEmitter.off(BoardEvents.PrivateChanged, onBoardsChanged)
  }, [])

  return boards
}

export function useFavoriteBoards() {
  const [boards, setBoards] = useAtom(favoriteBoardsAtom)

  useEffect(() => {
    const onBoardsChanged = async () => {
      const favoriteBoards = await BoardFavoritesSubscriber.getFavoriteBoards()
      setBoards(favoriteBoards)
    }
    BoardFavoritesSubscriber.subscribe()
    onBoardsChanged()
    globalEventEmitter.on(BoardEvents.FavoritesChanged, onBoardsChanged)
    return () => {
      globalEventEmitter.off(BoardEvents.FavoritesChanged, onBoardsChanged)
    }
  }, [])

  return boards
}


class BoardsSubscriberClass {
  private _isSubscribed = false

  public subscribe() {
    if (!this._isSubscribed) {
      this._isSubscribed = true
      this._subscribe()
    }
  }

  private _subscribe() {
    Meteor.subscribe(Collections.names.boards)
    const BoardCollection = Collections.getCollectionByName('boards')
    const onBoardsChanged = this._onBoardsChanged.bind(this)
    BoardCollection.find({}).observeChanges({
      added(_id, _fields) {
        onBoardsChanged()
      },
      changed(_id, _fields) {
        onBoardsChanged()
      },
      removed(_id) {
        onBoardsChanged()
      }
    })
  }

  private async _onBoardsChanged() {
    const privateBoards = await this.getMyBoards()
    const favoriteBoards = await this.getMyBoards({ favorite: true })
    globalEventEmitter.emit(BoardEvents.PrivateChanged, privateBoards)
    globalEventEmitter.emit(BoardEvents.FavoritesChanged, favoriteBoards)
  }

  public async getMyBoards(options?: IBoardFilterOptions): Promise<IBoard[]> {
    const userid = Meteor.userId()!
    const records = await BoardCollection.getMyBoards(userid)
    return Array.isArray(records) ? this._makeBoards(records, options) : []
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

  private _makeBoards(records: BoardRecord[], options?: IBoardFilterOptions): IBoard[] {
    return records.map(record => this._makeBoard(record, options))
  }
}

class BoardFavoritesSubscriberClass {
  private _isSubscribed = false

  public subscribe() {
    if (!this._isSubscribed) {
      this._isSubscribed = true
      this._subscribe()
    }
  }

  private _subscribe() {
    Meteor.subscribe(Collections.names.board_favorites)
    const BoardFavoritesCollection = Collections.getCollectionByName('board_favorites')
    const onFavoritesChanged = this._onFavoritesChanged.bind(this)
    BoardFavoritesCollection.find({}).observeChanges({
      added(_id, _fields) {
        onFavoritesChanged()
      },
      changed(_id, _fields) {
        onFavoritesChanged()
      },
      removed(_id) {
        onFavoritesChanged()
      }
    })
  }

  private async _onFavoritesChanged() {
    const favoriteBoards = await this.getFavoriteBoards()
    globalEventEmitter.emit(BoardEvents.FavoritesChanged, favoriteBoards)
  }

  public async getFavoriteBoards(): Promise<IBoard[]> {
    const userid = Meteor.userId()!
    const records = await BoardCollection.getMyBoards(userid)
    return Array.isArray(records) ? this._makeBoards(records) : []
  }

  private _makeBoards(records: BoardRecord[]): IBoard[] {
    return records.map(record => this._makeBoard(record))
  }

  private _makeBoard(record: BoardRecord): IBoard {
    const { _id: id, title, elements, files } = record
    return { id, title, elements, files }
  }
}

export const BoardFavoritesSubscriber = new BoardFavoritesSubscriberClass()
export const BoardsSubscriber = new BoardsSubscriberClass()
