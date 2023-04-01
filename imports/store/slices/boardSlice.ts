import { StoreMethod, StoreSetter } from '../types'
import { IBoard } from '/imports/excalidraw/types'

type Boards = Pick<IBoard, 'id' | 'title'>[]

export interface IBoardStore {
  boards: Boards
  changeBoardTitle: StoreMethod<Pick<IBoard, 'id' | 'title'>>
  setBoards: StoreMethod<Boards>
}

export const createBoardSlice = (set: StoreSetter<Pick<IBoardStore, 'boards'>>) => ({
  boards: [],
  changeBoardTitle: (board: Pick<IBoard, 'id' | 'title'>) => {
    set(state => {
      const boards = state.boards
      const index = boards.findIndex(board => board.id === board.id)
      boards[index] = board
      return { boards }
    })
  },
  setBoards: (newBoards: Boards) => {
    set(state => {
      const boards = state.boards
      for (const newBoard of newBoards) {
        const oldBoard = boards.find(({ id }) => id === newBoard.id)
        if (oldBoard != null) {
          oldBoard.title = newBoard.title
        } else {
          boards.push(newBoard)
        }
      }
      return { boards }
    })
  }
})
