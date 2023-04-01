import React, { useState } from 'react'
import { IBoard } from '/imports/excalidraw/types'
import styles from './FileListGroup.module.scss'
import cx from 'clsx'
import { AddIcon } from '/imports/components/icons'
import { Services } from '/imports/services/client'
import { throttle } from 'lodash'
import { useNavigate } from 'react-router-dom'

export interface IFileListGroupProps {
  groupId: 'Public' | 'Private' | 'Favorites'
  limit?: number
}

export const FileListGroup: React.FC<IFileListGroupProps> = ({ groupId, limit }) => {
  const navigate = useNavigate()
  const [boards] = useState<Pick<IBoard, 'id' | 'title'>[]>(
    [
      {
        id: Math.random().toString(36).slice(2, 7),
        title:
          'Markboard: Wysiwyg markdown whiteboard for note-taking and building team knowledge base'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'Rust best practices'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'Transform Any Meteor App into mobile applications'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'JavaScript lessons'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'ChatGPT prompts and tips'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'Marketing cycles'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'npm scripts using env'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'electron debug webview'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'Google translator api'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'how to debug vscode'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'Google SEO solutions'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'react nested route <Outlet />'
      },
      {
        id: Math.random().toString(36).slice(2, 7),
        title: 'git case sensitive folder rename'
      }
    ].sort(() => Math.random() - 0.5)
  )
  const sliceEnd = limit != null ? limit : boards.length

  const createBoard = throttle(async () => {
    const boardId = await Services.get('board').createNewBoard()
    navigate(`/board/${boardId}`)
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
        {boards.slice(0, sliceEnd).map(({ id, title }, index) => {
          const isActiveItem = index === 0 && groupId === 'Private'
          return (
            <div className={cx(styles.item, isActiveItem && styles.active)} key={id}>
              <div className={styles.dot}></div>
              <div className={styles.name}>{title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
