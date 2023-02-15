import React, { useEffect } from 'react'
import './OrganizationButton.style.scss'
import { Avatar } from '/imports/components/Avatar'
import { getClientColors } from '/imports/utils/clients'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { ArrowDownIcon } from '/imports/components/icons'
import { useStore } from '/imports/store'

export function OrganizationButton() {
  const { stroke, background } = getClientColors(Meteor.userId()!)
  const username = useStore(state => state.user.username)
  const setUsername = useStore(state => state.setUsername)

  useEffect(() => {
    const autorunUser = Tracker.autorun(() => {
      if (Meteor.user() == null) return
      setUsername(Meteor.user()!.username!)
    })

    return () => {
      autorunUser.stop()
    }
  }, [])

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
