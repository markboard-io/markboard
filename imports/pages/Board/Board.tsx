import React from 'react'
import { PanelGroup } from 'react-resizable-panels'
import { SidebarPanel } from './SidebarPanel'
import { MainPanel } from './MainPanel'
import './Board.style.scss'
import { useAtomValue } from 'jotai'
import { isSidebarOpenAtom } from '/imports/store/atomSidebar'

interface IBoardProps {
  id: string
}

export const Board: React.FC<IBoardProps> = ({ id: _id }) => {
  const isSidebarOpen = useAtomValue(isSidebarOpenAtom)

  return (
    <PanelGroup className='Board' direction='horizontal' autoSaveId='primary-panel-layouts'>
      <SidebarPanel isOpen={isSidebarOpen} />
      <MainPanel />
    </PanelGroup>
  )
}
