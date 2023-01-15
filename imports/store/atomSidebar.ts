import { atom } from 'jotai'
import { attachDebugLabel } from './utils'

export const isSidebarOpenAtom = attachDebugLabel(atom(true), 'isSidebarOpenAtom')
