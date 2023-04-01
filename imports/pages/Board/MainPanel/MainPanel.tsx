import './MainPanel.style.scss'
import React from 'react'
import { Panel } from 'react-resizable-panels'
import { ExcalidrawApp } from '/imports/excalidraw'

interface IMainPanelProps {
  boardId: string
}

export const MainPanel: React.FC<IMainPanelProps> = ({ boardId }) => {
  console.log('[debug]', `switch board: ${boardId}`)
  return (
    <Panel>
      <ExcalidrawApp key={boardId} />
    </Panel>
  )
}
