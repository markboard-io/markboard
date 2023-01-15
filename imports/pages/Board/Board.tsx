import React from 'react'
import { PanelGroup } from 'react-resizable-panels'
import { FileExplorerPanel } from './FileExplorerPanel'
import { MainPanel } from './MainPanel'
import './Board.style.scss'
import { useAtomValue } from 'jotai'
import { isSidebarOpenAtom } from '/imports/store/atomSidebar'

export function Board() {
  const isSidebarOpen = useAtomValue(isSidebarOpenAtom)

  return (
    <PanelGroup className='Board' direction='horizontal' autoSaveId='primary-panel-layouts'>
      <FileExplorerPanel isOpen={isSidebarOpen} />
      <MainPanel />
    </PanelGroup>
  )
}
