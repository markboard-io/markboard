import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { useEffect } from 'react'
import { useStore } from '/imports/store'

export function useSubscribeUsername() {
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
}
