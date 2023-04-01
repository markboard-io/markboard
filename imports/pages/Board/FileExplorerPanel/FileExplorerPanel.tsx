import React, { useState } from 'react'
import { Panel, PanelResizeHandle } from 'react-resizable-panels'
import { OrganizationButton } from './OrganizationButton'
import { FindAnything } from './FindAnything'
import { FileListGroup } from './FileListGroup'
import { useEffect } from 'react'
import styles from './FileExplorerPanel.module.scss'
import { BottomGroup } from './BottomGroup'

export interface IFileExplorerPanel {
  isOpen: boolean
}

export const FileExplorerPanel: React.FC<IFileExplorerPanel> = props => {
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
      <Panel style={panelStyle} defaultSize={15} minSize={15} className={styles.FileExplorerPanel}>
        <OrganizationButton />
        <FindAnything />
        <div className={styles.NonBottomGroups}>
          <FileListGroup groupId='Favorites' limit={5} />
          <FileListGroup groupId='Private' />
        </div>
        <BottomGroup />
      </Panel>
      {isOpen ? (
        <PanelResizeHandle className={styles.PanelResizeHandle}>
          <div
            className={styles.divider}
            style={dividerStyle}
            onMouseDown={() => setIsDragging(true)}
          ></div>
        </PanelResizeHandle>
      ) : null}
    </>
  )
}
