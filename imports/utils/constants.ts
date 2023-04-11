export const SITE_NAME = 'markboard'
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR'

/** Excalidraw */
export const DEFAULT_TEXT_COLOR = '#3F434A'
export enum Roughness {
  None = 0,
  Rough = 1,
  ExtremeRough = 2
}

/** application-level events */
export enum AppEvents {
  /** emit on pressing ENTER/TAB when is editing title */
  EDIT_BOARD = 'EDIT_BOARD'
}
