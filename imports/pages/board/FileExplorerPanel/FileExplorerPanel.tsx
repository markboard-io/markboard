import styles from './FileExplorerPanel.module.scss'
import React from 'react'
import { Panel, PanelResizeHandle } from 'react-resizable-panels'

export function FileExplorerPanel() {
  return (
    <>
      <Panel minSize={20} className={styles.FileExplorerPanel}></Panel>
      <PanelResizeHandle className={styles.PanelResizeHandle}>
        <div className={styles.Divider}></div>
      </PanelResizeHandle>
    </>
  )
}
