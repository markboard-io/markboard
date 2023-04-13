import { Meteor } from 'meteor/meteor'
import { Collections } from '/imports/models/Collections'
import { IBoard } from '../excalidraw/types'
import { globalEventEmitter } from '../utils'
import { atom, useAtom } from 'jotai'
import { attachDebugLabel } from '/imports/store'
import { useEffect } from 'react'
import { _makeBoard, _makeBoards } from '../utils/boards'
import { Services } from '../services/client'

export enum FavoriteBoardEvents {
  FavoritesChanged = 'BoardEvents_FavoritesChanged'
}
export const favoriteBoardsAtom = attachDebugLabel(atom<IBoard[]>([]), 'favoriteBoardsAtom')

export function useFavoriteBoards() {
  const [boards, setBoards] = useAtom(favoriteBoardsAtom)

  useEffect(() => {
    const onBoardsChanged = (boards: IBoard[]) => setBoards(boards)
    globalEventEmitter.on(FavoriteBoardEvents.FavoritesChanged, onBoardsChanged)
    BoardFavoritesSubscriber.subscribe()
    return () => {
      globalEventEmitter.off(FavoriteBoardEvents.FavoritesChanged, onBoardsChanged)
    }
  }, [])

  return boards
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
    const favoriteBoards =await Services.get('board').getMyFavoriteBoards()
    globalEventEmitter.emit(FavoriteBoardEvents.FavoritesChanged, favoriteBoards)
  }
}

export const BoardFavoritesSubscriber = new BoardFavoritesSubscriberClass()
