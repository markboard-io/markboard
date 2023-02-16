import React from 'react'
import './OrganizationButton.style.scss'
import { Avatar } from '/imports/components/Avatar'
import { getClientColors } from '/imports/utils/clients'
import { Meteor } from 'meteor/meteor'
import { ArrowDownIcon } from '/imports/components/icons'
import { useStore } from '/imports/store'

export function OrganizationButton() {
  const { stroke, background } = getClientColors(Meteor.userId()!)
  const username = useStore(state => state.user.username)

  return (
    <div className='OrganizationButton'>
      <Avatar
        className='OrganizationAvatar'
        color={background}
        border={stroke}
        name={username}
        src={''}
      />
      <div className='OrganizationName'>{username}</div>
      {ArrowDownIcon}
    </div>
  )
}
