import { ExcalidrawElement } from '../../element/types'
import { AppState } from '../../types'
import { clearAppStateForLocalStorage, getDefaultAppState } from '../../appState'
import { clearElementsForLocalStorage } from '../../element'
import { STORAGE_KEYS } from '../app_constants'
import { ImportedDataState } from '../../data/types'

/** Save a username to local storage */
export const saveUsernameToLocalStorage = (username: string) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LOCAL_STORAGE_COLLAB, JSON.stringify({ username }))
  } catch (error) {
    console.error(error)
  }
}

/** Import a username from local storage */
export const importUsernameFromLocalStorage = (): string | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_COLLAB)
    if (data) {
      return JSON.parse(data).username
    }
  } catch (error) {
    console.error('Unable to access local storage', error)
  }

  return null
}

/** Import elements and app state from local storage */
export const importFromLocalStorage = () => {
  let savedElements = null
  let savedState = null

  try {
    savedElements = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS)
    savedState = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_APP_STATE)
  } catch (error) {
    console.error('Unable to access local storage', error)
  }

  let elements: ExcalidrawElement[] = []
  if (savedElements) {
    try {
      elements = clearElementsForLocalStorage(JSON.parse(savedElements))
    } catch (error) {
      console.error(error)
    }
  }

  let appState = null
  if (savedState) {
    try {
      appState = {
        ...getDefaultAppState(),
        ...clearAppStateForLocalStorage(JSON.parse(savedState) as Partial<AppState>)
      }
    } catch (error) {
      console.error('Unable to access local storage', error)
    }
  }
  return { elements, appState }
}

/** Get the storage size of elements */
export const getElementsStorageSize = () => {
  try {
    const elements = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS)
    return elements?.length || 0
  } catch (error) {
    console.error('Unable to access local storage', error)
    return 0
  }
}

/** Get the total size of data stored in the local storage */
export const getTotalStorageSize = () => {
  try {
    const appState = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_APP_STATE)
    const collab = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_COLLAB)
    const library = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_LIBRARY)

    const appStateSize = appState?.length || 0
    const collabSize = collab?.length || 0
    const librarySize = library?.length || 0

    return appStateSize + collabSize + librarySize + getElementsStorageSize()
  } catch (error: any) {
    console.error('Unable to access local storage', error)
    return 0
  }
}

/** Get the library items stored in the local storage */
export const getLibraryItemsFromStorage = () => {
  try {
    const libraryItems: ImportedDataState['libraryItems'] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_LIBRARY) as string
    )

    return libraryItems || []
  } catch (error) {
    console.error('Unable to access local storage', error)
    return []
  }
}
