import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createRoot } from 'react-dom/client'
// import { router } from '../imports/pages/routes'
// import { RouterProvider } from 'react-router-dom'
// import App from '/imports/excalidraw/excalidraw-app/index'
import App from '/imports/excalidraw/packages/excalidraw/example/App'

Meteor.startup(() => {
  const root = document.getElementById('root') as HTMLDivElement
  createRoot(root).render(<App />)
})
