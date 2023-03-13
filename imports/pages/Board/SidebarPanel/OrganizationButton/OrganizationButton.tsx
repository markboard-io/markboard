import React from 'react'
import './OrganizationButton.style.scss'
import { Avatar } from '/imports/components/Avatar'
import { getClientColors } from '/imports/utils/clients'
import { Meteor } from 'meteor/meteor'
import { ArrowDownIcon } from '/imports/components/icons'
import { useStore } from '/imports/store'

export function OrganizationButton() {
  const { background } = getClientColors(Meteor.userId()!)
  const username = useStore(state => state.user.username)
  const avatarUrl = useStore(state => state.user.avatarUrl)

  return (
    <div className='OrganizationButton'>
      <Avatar
        className='OrganizationAvatar'
        color={background}
        border={null}
        name={username}
        src={avatarUrl}
      />
      <div className='OrganizationName'>{username}</div>
      {ArrowDownIcon}
    </div>
  )
}
