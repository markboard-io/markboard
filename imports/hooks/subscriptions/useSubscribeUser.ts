import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { useEffect } from 'react'
import { useStore } from '/imports/store'

export function useSubscribeUser() {
  const setUser = useStore(state => state.setUser)

  useEffect(() => {
    const autorunUser = Tracker.autorun(() => {
      if (Meteor.user() == null) return
      setUser({
        userid: Meteor.userId()!,
        username: Meteor.user()!.username!,
        // TODO: replace it with real user avatar images
        avatarUrl: '/images/mockAvatar.png'
      })
    })

    return () => {
      autorunUser.stop()
    }
  }, [])
}
