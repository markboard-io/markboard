import React from 'react'
import styles from './FileListGroup.module.scss'
import cx from 'clsx'
import { AddIcon } from '/imports/components/icons'
import { Services } from '/imports/services/client'
import { throttle } from 'lodash'
import { getCurrentBoardId } from '/imports/utils/board'
import { useFavoriteBoards, usePrivateBoards } from '/imports/subscriptions'
import { useSwitchBoard } from '/imports/hooks'

export interface IFileListGroupProps {
  groupId: 'Public' | 'Private' | 'Favorites'
  limit?: number
}

export const FileListGroup: React.FC<IFileListGroupProps> = ({ groupId }) => {
  const privateBoards = usePrivateBoards()
  const favoriteBoards = useFavoriteBoards()
  const boards = groupId === 'Private' ? privateBoards : favoriteBoards
  const currentBoardId = getCurrentBoardId()
  const switchBoard = useSwitchBoard()

  const createBoard = throttle(async () => {
    const boardId = await Services.get('board').createNewBoard()

    /**
     * when receiving `isNewBoard: true` the board should focus on editing title input.
     */
    switchBoard(boardId, { state: { isNewBoard: true } })
  }, 500)

  return (
    <div className={styles.FileListGroup}>
      <div className={styles.header}>
        <div className={styles.title}>{groupId}</div>
        <div className={styles.createBoard} onClick={createBoard}>
          {groupId !== 'Favorites' ? AddIcon : null}
        </div>
      </div>
      <div className={styles.items}>
        {boards.map(({ id, title }) => {
          const isActiveItem = currentBoardId === id
          return (
            <div
              className={cx(styles.item, isActiveItem && styles.active)}
              key={id}
              onClick={() => switchBoard(id)}
            >
              <div className={styles.dot}></div>
              <div className={styles.name}>{title ?? 'Untitled'}</div>
            </div>
          )
        })}
        {!boards.length ? (
          <div className={cx(styles.item, styles.empty)}>
            <div className={styles.name}>No boards to show here</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
