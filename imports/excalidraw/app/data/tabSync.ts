import { STORAGE_KEYS } from '../app_constants'

/**
 * In-memory object to keep track of browser storage state versions.
 */
const LOCAL_STATE_VERSIONS = {
  [STORAGE_KEYS.VERSION_DATA_STATE]: -1,
  [STORAGE_KEYS.VERSION_FILES]: -1
}

/**
 * Type for browser storage state keys.
 */
type BrowserStateTypes = keyof typeof LOCAL_STATE_VERSIONS

/**
 * Check if browser storage state is newer than in-memory state.
 */
export const isBrowserStorageStateNewer = (type: BrowserStateTypes) => {
  const storageTimestamp = JSON.parse(localStorage.getItem(type) || '-1')
  return storageTimestamp > LOCAL_STATE_VERSIONS[type]
}

/**
 * Update browser storage state and in-memory state version.
 */
export const updateBrowserStateVersion = (type: BrowserStateTypes) => {
  const timestamp = Date.now()
  localStorage.setItem(type, JSON.stringify(timestamp))
  LOCAL_STATE_VERSIONS[type] = timestamp
}

/**
 * Reset browser storage state and in-memory state versions to -1.
 */
export const resetBrowserStateVersions = () => {
  for (const key of Object.keys(LOCAL_STATE_VERSIONS) as BrowserStateTypes[]) {
    const timestamp = -1
    localStorage.setItem(key, JSON.stringify(timestamp))
    LOCAL_STATE_VERSIONS[key] = timestamp
  }
}
