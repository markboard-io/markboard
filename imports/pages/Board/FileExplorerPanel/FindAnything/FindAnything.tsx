import React from 'react'
import { SearchIcon } from '/imports/components/icons'
import './FindAnything.style.scss'

export function FindAnything() {
  return (
    <div className='FindAnything'>
      {SearchIcon}
      <input className='FindAnything_input' placeholder='Find Anything'></input>
    </div>
  )
}
