import colors from '../excalidraw/colors'
import { AppState } from '/imports/excalidraw/types'

export const getClientColorsWithAppState = (clientId: string, appState: AppState) => {
  if (appState?.collaborators) {
    const currentUser = appState.collaborators.get(clientId)
    if (currentUser?.color) {
      return currentUser.color
    }
  }
  return getClientColors(clientId)
}

export const getClientColors = (clientId: string) => {
  // Naive way of getting an integer out of the clientId
  const sum = clientId.split('').reduce((a, str) => a + str.charCodeAt(0), 0)

  // Skip transparent & gray colors
  const backgrounds = colors.elementBackground.slice(3)
  const strokes = colors.elementStroke.slice(3)
  return {
    background: backgrounds[sum % backgrounds.length],
    stroke: strokes[sum % strokes.length]
  }
}

export const getClientInitials = (userName?: string | null) => {
  if (!userName) {
    return '?'
  }
  return userName.trim()[0].toUpperCase()
}
