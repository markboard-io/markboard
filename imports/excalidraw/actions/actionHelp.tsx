import React from 'react'
import { register } from './register'
import { HelpButton } from '../components/HelpButton'
import MenuItem from '../components/MenuItem'
import { ShortcutIcon } from '../components/icons'
import { t } from '/imports/i18n'
import { isMenuOpenAtom } from '../components/ExcalidrawCore'
import { useAtom } from 'jotai'

export const actionHelp = register({
  name: 'toggleHelpIsland',
  viewMode: true,
  trackEvent: { category: 'menu', action: 'toggleHelpDialog' },
  perform: (_elements, appState, _, { focusContainer }) => {
    if (appState.openDialog === 'help') {
      focusContainer()
    }
    return {
      appState: {
        ...appState,
        openDialog: appState.openDialog === 'help' ? null : 'help'
      },
      commitToHistory: false
    }
  },
  PanelComponent: ({ updateData, isInHamburgerMenu }) => {
    const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom)

    const openHelpMenu = () => {
      console.log({ isMenuOpen })
      if (isMenuOpen) return
      setIsMenuOpen(true)
    }

    return isInHamburgerMenu ? (
      <MenuItem
        label={t('helpDialog.shortcuts')}
        dataTestId='help-menu-item'
        icon={ShortcutIcon}
        onClick={updateData}
      />
    ) : (
      <HelpButton title={t('helpDialog.title')} onClick={openHelpMenu} />
    )
  }
})
