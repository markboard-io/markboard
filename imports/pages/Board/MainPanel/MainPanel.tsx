import './MainPanel.style.scss'
import React from 'react'
import { Panel } from 'react-resizable-panels'
import { ExcalidrawApp } from '/imports/excalidraw'

export function MainPanel() {
  return (
    <Panel>
      <ExcalidrawApp />
    </Panel>
  )
}
