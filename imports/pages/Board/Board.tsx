import React from 'react'
import { PanelGroup } from 'react-resizable-panels'
import { FileExplorerPanel } from './FileExplorerPanel'
import { MainPanel } from './MainPanel'
import './Board.style.scss'

export function Board() {
  return (
    <PanelGroup className='Board' direction='horizontal' autoSaveId='primary-panel-layouts'>
      <FileExplorerPanel />
      <MainPanel />
    </PanelGroup>
  )
}
