import React from 'react'
import styles from './TopRightControls.module.scss'
import cx from 'clsx'
import { MoreIcon, StarIcon, FilledStarIcon } from '/imports/components/icons'
import { Services } from '/imports/services/client'
import { throttle } from 'lodash'
import { getCurrentBoardId } from '/imports/utils/board'
import { useAtom, atom } from 'jotai'

const favorite = atom(false)
export const TopRightControls = () => {
  let [favoriteState, setFavoriteState] = useAtom(favorite)

  const toggleFavorite = throttle(async () => {
    const boardId = getCurrentBoardId()
    if (!favoriteState) {
      await Services.get('board').starBoard(boardId)
      setFavoriteState(true)
    } else {
      await Services.get('board').cancelStarBoard(boardId)
      setFavoriteState(false)
    }
  }, 500)

  return (
    <div className={styles.TopRightControls}>
      <div className={cx(styles.share, styles.button)}>Share</div>
      <div className={cx(styles.collect, styles.button)} onClick={toggleFavorite}>
        {favoriteState ? FilledStarIcon : StarIcon}
      </div>
      <div className={cx(styles.more, styles.button)}>{MoreIcon}</div>
    </div>
  )
}
