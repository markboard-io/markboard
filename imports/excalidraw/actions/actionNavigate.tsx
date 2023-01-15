import React from 'react'
import { getClientColorsWithAppState } from '/imports/utils/clients'
import { Avatar } from '/imports/components/Avatar'
import { centerScrollOn } from '../scene/scroll'
import { Collaborator } from '../types'
import { register } from './register'

export const actionGoToCollaborator = register({
  name: 'goToCollaborator',
  viewMode: true,
  trackEvent: { category: 'collab' },
  perform: (_elements, appState, value) => {
    const point = value as Collaborator['pointer']
    if (!point) {
      return { appState, commitToHistory: false }
    }

    return {
      appState: {
        ...appState,
        ...centerScrollOn({
          scenePoint: point,
          viewportDimensions: {
            width: appState.width,
            height: appState.height
          },
          zoom: appState.zoom
        }),
        // Close mobile menu
        openMenu: appState.openMenu === 'canvas' ? null : appState.openMenu
      },
      commitToHistory: false
    }
  },
  PanelComponent: ({ appState, updateData, data }) => {
    const [clientId, collaborator] = data as [string, Collaborator]

    const { background, stroke } = getClientColorsWithAppState(clientId, appState)

    return (
      <Avatar
        color={background}
        border={stroke}
        onClick={() => updateData(collaborator.pointer)}
        name={collaborator.username || ''}
        src={collaborator.avatarUrl}
      />
    )
  }
})
