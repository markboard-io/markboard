import { Services } from './client'
import { reconcileElements } from '/imports/excalidraw/app/collab/reconciliation'
import { AppState, IBoard } from '/imports/excalidraw/types'

export async function updateBoard(board: IBoard, localAppState: AppState) {
  const remoteBoard = await Services.get('board').getBoardById(board.id)
  const remoteElements = Array.isArray(remoteBoard?.elements) ? board!.elements : []
  const elements = reconcileElements(board.elements, remoteElements, localAppState)
  const files = Object.assign({}, board.files, remoteBoard?.files)
  const result = await Services.get('board').saveBoard({
    ...board,
    elements,
    files
  })
  return { result, elements, files }
}
