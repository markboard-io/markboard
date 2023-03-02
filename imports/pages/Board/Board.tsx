import React, { useEffect } from 'react'
import { PanelGroup } from 'react-resizable-panels'
import { SidebarPanel } from './SidebarPanel'
import { MainPanel } from './MainPanel'
import './Board.style.scss'
import { useAtomValue } from 'jotai'
import { isSidebarOpenAtom } from '/imports/store/atomSidebar'
import { Services } from '/imports/services/client'
import { useStore } from '/imports/store'

interface IBoardProps {
  id: string
}

export const Board: React.FC<IBoardProps> = ({ id: _id }) => {
  const setAppState = useStore(state => state.setAppState)
  const isSidebarOpen = useAtomValue(isSidebarOpenAtom)

  useEffect(() => {
    Services.get('app').getAppState().then(setAppState)
  }, [])

  return (
    <PanelGroup className='Board' direction='horizontal' autoSaveId='primary-panel-layouts'>
      <SidebarPanel isOpen={isSidebarOpen} />
      <MainPanel />
    </PanelGroup>
  )
}
