import { Meteor } from 'meteor/meteor'
import { Collections } from '../models/Collections'
import { useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { IBoard } from '../excalidraw/types'
import { globalEventEmitter } from '../utils'
import { Services } from '../services/client'

export enum SearchEvents {
  SearchChanged = 'SearchEvents_SearchChanged'
}
export const searchAtom = atom<IBoard[]>([])

export function SearchChanged() {
  const [boards, setBoards] = useAtom(searchAtom)
  useEffect(() => {
    const onSearchChanged = (boards: IBoard[]) => setBoards(boards)
    globalEventEmitter.on(SearchEvents.SearchChanged, onSearchChanged)
    SearchSubscriber.subscribe()
    return () => {
      globalEventEmitter.off(SearchEvents.SearchChanged, onSearchChanged)
    }
  }, [])
  return boards
}

class SearchSubscriberClass {
  private _isSubscribed = false

  public subscribe() {
    if (!this._isSubscribed) {
      this._isSubscribed = true
      this._subscribe()
    }
  }

  private _subscribe() {
    Meteor.subscribe(Collections.names.boards)
    const BoardsCollection = Collections.getCollectionByName('boards')
    const onSearchChanged = this._onSearchChanged.bind(this)
    BoardsCollection.find({}).observeChanges({
      added(_id, _fields) {
        onSearchChanged()
      }
    })
  }

  private async _onSearchChanged() {
    const boards = await Services.get('search').searchBoards('')
    globalEventEmitter.emit(SearchEvents.SearchChanged, boards)
  }
}

export const SearchSubscriber = new SearchSubscriberClass()
