import React from 'react'
import { HamburgerMenuIcon, palette } from '/imports/components/icons'
import { ToolButton } from '../components/ToolButton'
import { t } from '/imports/i18n'
import { showSelectedShapeActions, getNonDeletedElements } from '../element'
import { register } from './register'
import { allowFullScreen, exitFullScreen, isFullScreen } from '../utils'
import { KEYS } from '../keys'

export const actionToggleCanvasMenu = register({
  name: 'toggleCanvasMenu',
  trackEvent: { category: 'menu' },
  perform: (_, appState) => ({
    appState: {
      ...appState,
      openMenu: appState.openMenu === 'canvas' ? null : 'canvas'
    },
    commitToHistory: false
  }),
  PanelComponent: ({ appState, updateData }) => (
    <ToolButton
      type='button'
      icon={HamburgerMenuIcon}
      aria-label={t('buttons.menu')}
      onClick={updateData}
      selected={appState.openMenu === 'canvas'}
    />
  )
})

export const actionToggleEditMenu = register({
  name: 'toggleEditMenu',
  trackEvent: { category: 'menu' },
  perform: (_elements, appState) => ({
    appState: {
      ...appState,
      openMenu: appState.openMenu === 'shape' ? null : 'shape'
    },
    commitToHistory: false
  }),
  PanelComponent: ({ elements, appState, updateData }) => (
    <ToolButton
      visible={showSelectedShapeActions(appState, getNonDeletedElements(elements))}
      type='button'
      icon={palette}
      aria-label={t('buttons.edit')}
      onClick={updateData}
      selected={appState.openMenu === 'shape'}
    />
  )
})

export const actionFullScreen = register({
  name: 'toggleFullScreen',
  viewMode: true,
  trackEvent: { category: 'canvas', predicate: _appState => !isFullScreen() },
  perform: () => {
    if (!isFullScreen()) {
      allowFullScreen()
    }
    if (isFullScreen()) {
      exitFullScreen()
    }
    return {
      commitToHistory: false
    }
  },
  keyTest: event => event.key === KEYS.F && !event[KEYS.CTRL_OR_CMD]
})
