import React from 'react'
import { ActionManager } from '../actions/manager'
import { LanguageList } from '../app/components/LanguageList'
import { AppState } from '../types'
import { Separator, MenuLinks } from './MenuUtils'
import { Section } from './Section'
import { Island } from '/imports/components/Island'
import { t } from '/imports/i18n'
import './HelpMenuPanel.style.scss'

interface IHelpMenuPanelProps {
  isMenuOpen: boolean
  menuRef: React.RefObject<HTMLDivElement>
  actionManager: ActionManager
  appState: AppState
}

export const HelpMenuPanel: React.FC<IHelpMenuPanelProps> = ({
  isMenuOpen,
  menuRef,
  actionManager,
  appState
}) => {
  return (
    <>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className='help-menu-panel'
        >
          <Section heading='canvasActions'>
            {/* the zIndex ensures this menu has higher stacking order,
       see https://github.com/excalidraw/excalidraw/pull/1445 */}
            <Island className='menu-container' padding={2}>
              {actionManager.renderAction('toggleHelpIsland', undefined, true)}
              {!appState.viewModeEnabled && actionManager.renderAction('clearCanvas')}
              <Separator />
              <MenuLinks />
              <Separator />
              <div className='operation-items'>
                <div>{actionManager.renderAction('toggleTheme')}</div>
                <div className='language-list-item'>
                  <LanguageList style={{ width: '100%' }} />
                </div>
                {!appState.viewModeEnabled && (
                  <div className='canvas-background-item'>
                    <div className='canvas-background-item_label'>
                      {t('labels.canvasBackground')}
                    </div>
                    <div className='canvas-background-item_select'>
                      {actionManager.renderAction('changeViewBackgroundColor', {
                        verticalOffset: -40
                      })}{' '}
                    </div>
                  </div>
                )}
              </div>
            </Island>
          </Section>
        </div>
      )}
    </>
  )
}
