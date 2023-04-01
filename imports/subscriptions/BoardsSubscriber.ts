import { Meteor } from 'meteor/meteor'
import { Collections } from '../models/Collections'
import { IBoard } from '../excalidraw/types'
import { BoardCollection, BoardRecord } from '../models'
import { IBoardFilterOptions } from '../services/BoardService'
import { useEffect, useState } from 'react'
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
    const onBoardsChanged = (boards: IBoard[]) => setBoards(boards)
    globalEventEmitter.on(BoardEvents.FavoritesChanged, onBoardsChanged)
    return () => globalEventEmitter.off(BoardEvents.FavoritesChanged, onBoardsChanged)
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
    console.log('observeChanges')
    const BoardCollection = Collections.getCollectionByName('boards')
    const onBoardsChanged = this._onBoardsChanged.bind(this)
    BoardCollection.find({}).observeChanges({
      added(id, fields) {
        console.log('boards added:', id, fields)
        onBoardsChanged()
      },
      changed(id, fields) {
        console.log('boards changed:', id, fields)
        onBoardsChanged()
      },
      removed(id) {
        console.log('boards removed:', id)
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
    const records = await BoardCollection.getMyBoards(userid, options)
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

export const BoardsSubscriber = new BoardsSubscriberClass()
