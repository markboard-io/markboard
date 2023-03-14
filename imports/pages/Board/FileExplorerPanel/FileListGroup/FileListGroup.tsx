import React, { useState } from 'react'
import { IBoard } from '/imports/excalidraw/types'

import './FileListGroup.style.scss'

export interface IFileListGroupProps {
  groupId: 'Public' | 'Private' | 'Favorites'
  limit?: number
}

export const FileListGroup: React.FC<IFileListGroupProps> = ({ groupId, limit }) => {
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
        title: 'np scripts using env'
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

  return (
    <div className='FileList'>
      <div className='FileListTitleContainer'>
        <div className='FileListTitle'>{groupId}</div>
      </div>
      <div className='FileListItems'>
        {boards.slice(0, sliceEnd).map(({ id, title }) => (
          <div className='FileListItem' key={id}>
            <div className='FileListItemDot'></div>
            <div className='FileListItemName'>{title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
