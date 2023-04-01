import React from 'react'
import { SearchIcon } from '/imports/components/icons'
import styles from './FindAnything.module.scss'

export function FindAnything() {
  return (
    <div className={styles.FindAnything}>
      {SearchIcon}
      <input placeholder='Find Anything'></input>
    </div>
  )
}
