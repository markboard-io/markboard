import React, { useState } from 'react'
import { Panel, PanelResizeHandle } from 'react-resizable-panels'
import './FileExplorerPanel.style.scss'
import { useEffect } from 'react'

export interface ISidebarProps {
  isOpen: boolean
}

export const FileExplorerPanel: React.FC<ISidebarProps> = props => {
  const [isDragging, setIsDragging] = useState(false)
  const isOpen = props?.isOpen ?? true

  const panelStyle: React.CSSProperties = {
    display: isOpen ? '' : 'none'
  }
  const dividerStyle: React.CSSProperties = {
    borderRight: isDragging ? '2px solid var(--background-primary)' : ''
  }

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', onMouseUp)
    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [])

  return (
    <>
      <Panel style={panelStyle} defaultSize={15} minSize={15} className='FileExplorerPanel'></Panel>
      {isOpen ? (
        <PanelResizeHandle className='PanelResizeHandle'>
          <div
            className='Divider'
            style={dividerStyle}
            onMouseDown={() => setIsDragging(true)}
          ></div>
        </PanelResizeHandle>
      ) : null}
    </>
  )
}
