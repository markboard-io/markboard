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
import { useSubUsername } from '/imports/hooks'
import { Services } from '/imports/services/client'

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
  createRoot(root).render(<Launcher />)

  // mount Services onto window for testing
  window.gtag
  window.Services = Services
})
