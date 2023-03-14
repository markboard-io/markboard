import React, { useEffect } from 'react'
import { PanelGroup } from 'react-resizable-panels'
import { FileExplorerPanel } from './FileExplorerPanel'
import { MainPanel } from './MainPanel'
import { useAtomValue } from 'jotai'
import { isSidebarOpenAtom } from '/imports/store/atomSidebar'
import { Services } from '/imports/services/client'
import { useStore } from '/imports/store'

import './Board.style.scss'

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
      <FileExplorerPanel isOpen={isSidebarOpen} />
      <MainPanel />
    </PanelGroup>
  )
}
