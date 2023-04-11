import { BoardRecord } from '../models'
import { IBoard } from '../excalidraw/types'
import { IBoardFilterOptions } from '../services/BoardService'

export function _makeBoard(record: BoardRecord, options?: IBoardFilterOptions): IBoard {
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


export function _makeBoards(records: BoardRecord[], options?: IBoardFilterOptions): IBoard[] {
  return records.map(record => _makeBoard(record, options))
}