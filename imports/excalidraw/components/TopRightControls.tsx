import React,{useEffect} from 'react'
import styles from './TopRightControls.module.scss'
import cx from 'clsx'
import { MoreIcon, StarIcon, FilledStarIcon } from '/imports/components/icons'
import { Services } from '/imports/services/client'
import { throttle } from 'lodash'
import { getCurrentBoardId } from '/imports/utils/board'
import { useAtom, atom } from 'jotai'

const favoriteAtom = atom(false)
let boardId = getCurrentBoardId()
export const TopRightControls = () => {
  let [favoriteState, setFavoriteState] = useAtom(favoriteAtom)
  
  useEffect(() => {
    const getFavoriteState = async () => {
      boardId = getCurrentBoardId()
      const isFavorite = await Services.get('board_favorite').isBoardFavorite(boardId)
      setFavoriteState(isFavorite)
    }
    getFavoriteState()
  }, [boardId])
  const toggleFavorite = throttle(async () => {
    if (!favoriteState) {
      await Services.get('board_favorite').starBoard(boardId)
      setFavoriteState(true)
    } else {
      await Services.get('board_favorite').cancelStarBoard(boardId)
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
