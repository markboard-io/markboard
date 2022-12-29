import React from 'react'
// TODO barnabasmolnar/editor-redesign
// this icon is not great
import { getShortcutFromShortcutName } from '../actions/shortcuts'
import { save } from '../components/icons'
import { t } from  '/imports/i18n'

import './ActiveFile.style.scss'
import MenuItem from './MenuItem'

type ActiveFileProps = {
  fileName?: string
  onSave: () => void
}

export const ActiveFile = ({ fileName: _, onSave }: ActiveFileProps) => (
  <MenuItem
    label={`${t('buttons.save')}`}
    shortcut={getShortcutFromShortcutName('saveScene')}
    dataTestId='save-button'
    onClick={onSave}
    icon={save}
  />
)
