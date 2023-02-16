import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createRoot } from 'react-dom/client'
import { router } from '/imports/pages/routes'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { startupClient } from './startupClient'
import { TopErrorBoundary } from '/imports/components/TopErrorBoundary'
import { Provider } from 'jotai'
import { useAtomsDebugValue } from 'jotai/devtools'
import { jotaiStore } from '/imports/store/jotai'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { Services } from '/imports/services/client'
import { useSubUsername } from '/imports/hooks'

const DebugAtoms = () => {
  useAtomsDebugValue()
  return null
}

const Launcher = () => {
  useSubUsername()

  return (
    <TopErrorBoundary>
      <Provider unstable_createStore={() => jotaiStore}>
        <DebugAtoms />
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </TopErrorBoundary>
  )
}

Meteor.startup(() => {
  const root = document.getElementById('root') as HTMLDivElement
  startupClient()
  Services.get('app').getAppState().then(console.log)
  createRoot(root).render(<Launcher />)
})
