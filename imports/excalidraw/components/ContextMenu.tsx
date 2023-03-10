import clsx from 'clsx'
import { Popover } from '/imports/components/Popover'
import { t } from '/imports/i18n'

import './ContextMenu.style.scss'
import { getShortcutFromShortcutName, ShortcutName } from '../actions/shortcuts'
import { Action } from '../actions/types'
import { ActionManager } from '../actions/manager'
import {
  useExcalidrawAppState,
  useExcalidrawElements,
  useExcalidrawSetAppState
} from './ExcalidrawCore'
import React from 'react'

export type ContextMenuItem = typeof CONTEXT_MENU_SEPARATOR | Action

export type ContextMenuItems = (ContextMenuItem | false | null | undefined)[]

type ContextMenuProps = {
  actionManager: ActionManager
  items: ContextMenuItems
  top: number
  left: number
}

export const CONTEXT_MENU_SEPARATOR = 'separator'

export const ContextMenu = React.memo(({ actionManager, items, top, left }: ContextMenuProps) => {
  const appState = useExcalidrawAppState()
  const setAppState = useExcalidrawSetAppState()
  const elements = useExcalidrawElements()

  const filteredItems = items.reduce((acc: ContextMenuItem[], item) => {
    if (
      item &&
      (item === CONTEXT_MENU_SEPARATOR ||
        !item.contextItemPredicate ||
        item.contextItemPredicate(elements, appState, actionManager.app.props, actionManager.app))
    ) {
      acc.push(item)
    }
    return acc
  }, [])

  const renderShortcutName = (actionName: string) => {
    const shortcutName = actionName ? getShortcutFromShortcutName(actionName as ShortcutName) : ''
    return shortcutName ? <kbd className='context-menu-item__shortcut'>{shortcutName}</kbd> : null
  }

  return (
    <Popover
      onCloseRequest={() => setAppState({ contextMenu: null })}
      top={top}
      left={left}
      fitInViewport={true}
      offsetLeft={appState.offsetLeft}
      offsetTop={appState.offsetTop}
      viewportWidth={appState.width}
      viewportHeight={appState.height}
    >
      <ul className='context-menu' onContextMenu={event => event.preventDefault()}>
        {filteredItems.map((item, idx) => {
          if (item === CONTEXT_MENU_SEPARATOR) {
            if (!filteredItems[idx - 1] || filteredItems[idx - 1] === CONTEXT_MENU_SEPARATOR) {
              return null
            }
            return <hr key={idx} className='context-menu-item-separator' />
          }

          const actionName = item.name
          let label = ''
          if (item.contextItemLabel) {
            if (typeof item.contextItemLabel === 'function') {
              label = t(item.contextItemLabel(elements, appState))
            } else {
              label = t(item.contextItemLabel)
            }
          }

          return (
            <li
              key={idx}
              data-testid={actionName}
              onClick={() => {
                // we need update state before executing the action in case
                // the action uses the appState it's being passed (that still
                // contains a defined contextMenu) to return the next state.
                setAppState({ contextMenu: null }, () => {
                  actionManager.executeAction(item, 'contextMenu')
                })
              }}
            >
              <button
                className={clsx('context-menu-item', {
                  dangerous: actionName === 'deleteSelectedElements',
                  checkmark: item.checked?.(appState)
                })}
              >
                <div className='context-menu-item__label'>{label}</div>
                {renderShortcutName(actionName)}
              </button>
            </li>
          )
        })}
      </ul>
    </Popover>
  )
})
