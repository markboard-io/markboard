import React, { useEffect, useState } from 'react'
import { IBoard } from '/imports/excalidraw/types'
import styles from './FileListGroup.module.scss'
import cx from 'clsx'
import { AddIcon } from '/imports/components/icons'
import { Services } from '/imports/services/client'
import { throttle } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { getCurrentBoardId } from '/imports/utils/board'
import type { IBoardFilterOptions } from '/imports/services/BoardService'

export interface IFileListGroupProps {
  groupId: 'Public' | 'Private' | 'Favorites'
  limit?: number
}

export const FileListGroup: React.FC<IFileListGroupProps> = ({ groupId, limit }) => {
  const navigate = useNavigate()
  const [boards, setBoards] = useState<Pick<IBoard, 'id' | 'title'>[]>([])
  const [isDataFetched, setIsDataFetched] = useState(false)
  const sliceEnd = limit != null ? limit : boards.length
  const currentBoardId = getCurrentBoardId()

  const createBoard = throttle(async () => {
    const boardId = await Services.get('board').createNewBoard()
    navigate(`/board/${boardId}`)
  }, 500)

  const getMyBoards = async () => {
    const options = {} as IBoardFilterOptions

    if (groupId === 'Favorites') {
      options.favorite = true
    }

    const boards = await Services.get('board').getMyBoards({ ...options, keys: ['title', 'id'] })
    setBoards(boards)
    setIsDataFetched(true)
  }

  useEffect(() => {
    getMyBoards()
  }, [])

  return (
    <div className={styles.FileListGroup}>
      <div className={styles.header}>
        <div className={styles.title}>{groupId}</div>
        <div className={styles.createBoard} onClick={createBoard}>
          {groupId !== 'Favorites' ? AddIcon : null}
        </div>
      </div>
      <div className={styles.items}>
        {boards.slice(0, sliceEnd).map(({ id, title }) => {
          const isActiveItem = currentBoardId === id && groupId === 'Private'
          return (
            <div
              className={cx(styles.item, isActiveItem && styles.active)}
              key={id}
              onClick={() => navigate(`/board/${id}`)}
            >
              <div className={styles.dot}></div>
              <div className={styles.name}>{title ?? 'Untitled'}</div>
            </div>
          )
        })}
        {isDataFetched && !boards.length ? (
          <div className={cx(styles.item, styles.empty)}>
            <div className={styles.name}>No boards to show here</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
