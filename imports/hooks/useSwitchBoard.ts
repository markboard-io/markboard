import { useNavigate } from 'react-router-dom'
import { Services } from '../services/client'

export function useSwitchBoard() {
  const navigate = useNavigate()

  return (boardId: string, params = {}) => {
    Services.get('app').setCurrentBoardId(boardId)
    navigate(`/board/${boardId}`, params)
  }
}
