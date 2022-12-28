import { CODES, KEYS } from '../keys'
import { register } from './register'

export const actionToggleZenMode = register({
  name: 'zenMode',
  viewMode: true,
  trackEvent: {
    category: 'canvas',
    predicate: appState => !appState.zenModeEnabled
  },
  perform(_elements, appState) {
    return {
      appState: {
        ...appState,
        zenModeEnabled: !this.checked!(appState)
      },
      commitToHistory: false
    }
  },
  checked: appState => appState.zenModeEnabled,
  contextItemPredicate: (_elements, _appState, appProps) => {
    return typeof appProps.zenModeEnabled === 'undefined'
  },
  contextItemLabel: 'buttons.zenMode',
  keyTest: event => !event[KEYS.CTRL_OR_CMD] && event.altKey && event.code === CODES.Z
})
