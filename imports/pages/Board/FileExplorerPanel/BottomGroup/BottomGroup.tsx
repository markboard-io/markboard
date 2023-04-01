import React from 'react'
import cx from 'clsx'
import styles from './BottomGroup.module.scss'
import { AddPeopleIcon, SimpleTrashIcon, TemplateIcon } from '/imports/components/icons'

export function BottomGroup() {
  return (
    <div className={styles.BottomGroup}>
      <div className={cx(styles.button, styles.addPeople)}>{AddPeopleIcon} Add People</div>
      <div className={cx(styles.button, styles.templates)}>{TemplateIcon} Templates</div>
      <div className={cx(styles.button, styles.trash)}>{SimpleTrashIcon} Trash</div>
    </div>
  )
}
