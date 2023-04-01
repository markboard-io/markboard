import React from 'react'
import styles from './TopRightControls.module.scss'
import cx from 'clsx'
import { MoreIcon, StarIcon } from '/imports/components/icons'

export const TopRightControls = () => {
  return (
    <div className={styles.TopRightControls}>
      <div className={cx(styles.share, styles.button)}>Share</div>
      <div className={cx(styles.collect, styles.button)}>{StarIcon}</div>
      <div className={cx(styles.more, styles.button)}>{MoreIcon}</div>
    </div>
  )
}
