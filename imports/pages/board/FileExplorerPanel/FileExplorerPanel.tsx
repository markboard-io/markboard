import React from 'react'
import { Panel, PanelResizeHandle } from 'react-resizable-panels'
import './FileExplorerPanel.style.scss'

export function FileExplorerPanel() {
  return (
    <>
      <Panel minSize={20} className='FileExplorerPanel'></Panel>
      <PanelResizeHandle className='PanelResizeHandle'>
        <div className='Divider'></div>
      </PanelResizeHandle>
    </>
  )
}
