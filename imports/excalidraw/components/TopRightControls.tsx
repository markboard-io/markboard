import React from 'react'
import styles from './TopRightControls.module.scss'
import cx from 'clsx'
import { MoreIcon, StarIcon, FilledStarIcon } from '/imports/components/icons'
import { Services } from '/imports/services/client'
import { throttle } from 'lodash'
import { getCurrentBoardId } from '/imports/utils/board'
import { useFavoriteBoards, usePrivateBoards } from '/imports/subscriptions'

export const TopRightControls = () => {
  const favoriteBoards = useFavoriteBoards()
  const privateBoards = usePrivateBoards()
  const boardId = getCurrentBoardId()
  const currentBoard = privateBoards.find(board => board.id === boardId)
  const currentBoardFavorite=favoriteBoards.find(board => board.id === boardId)
  const isfavorite = currentBoardFavorite?.id===currentBoard?.id
  const toggleFavorite = throttle(async () => {
    if (!isfavorite) {
      await Services.get('board_favorite').starBoard(boardId)
    } else {
      await Services.get('board_favorite').cancelStarBoard(boardId)
    }
  }, 500)

  return (
    <div className={styles.TopRightControls}>
      <div className={cx(styles.share, styles.button)}>Share</div>
      <div className={cx(styles.collect, styles.button)} onClick={toggleFavorite}>
        {isfavorite ? FilledStarIcon : StarIcon}
      </div>
      <div className={cx(styles.more, styles.button)}>{MoreIcon}</div>
    </div>
  )
}
