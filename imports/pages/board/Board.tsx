import React from 'react'
import styles from './Board.module.scss'
import { PanelGroup } from 'react-resizable-panels'
import { FileExplorerPanel } from './FileExplorerPanel'
import { MainPanel } from './MainPanel'

export function Board() {
  return (
    <PanelGroup className={styles.Board} direction='horizontal' autoSaveId='primary-panel-layouts'>
      <FileExplorerPanel />
      <MainPanel />
    </PanelGroup>
  )
}
