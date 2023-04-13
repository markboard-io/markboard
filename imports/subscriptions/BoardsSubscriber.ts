import { Meteor } from 'meteor/meteor'
import { Collections } from '/imports/models/Collections'
import { IBoard } from '../excalidraw/types'
import { useEffect } from 'react'
import { globalEventEmitter } from '../utils'
import { attachDebugLabel } from '/imports/store'
import { atom, useAtom } from 'jotai'
import { BoardService } from '../services/BoardService'

export enum BoardEvents {
  PrivateChanged = 'BoardEvents_PrivateChanged'
}

export const privateBoardsAtom = attachDebugLabel(atom<IBoard[]>([]), 'privateBoardsAtom')

export function usePrivateBoards() {
  const [boards, setBoards] = useAtom(privateBoardsAtom)

  useEffect(() => {
    const onBoardsChanged = (boards: IBoard[]) => setBoards(boards)
    globalEventEmitter.on(BoardEvents.PrivateChanged, onBoardsChanged)
    return () => globalEventEmitter.off(BoardEvents.PrivateChanged, onBoardsChanged)
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
    const privateBoards = BoardService.getMyBoards()
    globalEventEmitter.emit(BoardEvents.PrivateChanged, privateBoards)
  }
}

export const BoardsSubscriber = new BoardsSubscriberClass()
