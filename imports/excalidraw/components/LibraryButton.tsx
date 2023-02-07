import React from 'react'
import { t } from '/imports/i18n'
import { AppState } from '../types'
import { capitalizeString } from '../utils'
import { trackEvent } from '../analytics'
import { useDevice } from './ExcalidrawCore'
import './LibraryButton.style.scss'
import { LibraryIcon } from '/imports/components/icons'

export const LibraryButton: React.FC<{
  appState: AppState
  setAppState: React.Component<any, AppState>['setState']
  isMobile?: boolean
}> = ({ appState, setAppState }) => {
  const device = useDevice()

  // TODO barnabasmolnar/redesign
  // not great, toolbar jumps in a jarring manner
  if (appState.isSidebarDocked && appState.openSidebar === 'library') {
    return null
  }

  return (
    <label title={`${capitalizeString(t('toolBar.library'))}`}>
      <input
        className='ToolIcon_type_checkbox'
        type='checkbox'
        name='editor-library'
        onChange={event => {
          document.querySelector('.layer-ui__wrapper')?.classList.remove('animate')
          const isOpen = event.target.checked
          setAppState({ openSidebar: isOpen ? 'library' : null })
          // track only openings
          if (isOpen) {
            trackEvent(
              'library',
              'toggleLibrary (open)',
              `toolbar (${device.isMobile ? 'mobile' : 'desktop'})`
            )
          }
        }}
        checked={appState.openSidebar === 'library'}
        aria-label={capitalizeString(t('toolBar.library'))}
        aria-keyshortcuts='0'
      />
      <div className='library-button'>
        <div>{LibraryIcon}</div>
      </div>
    </label>
  )
}
