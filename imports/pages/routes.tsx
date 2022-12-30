import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Board } from './Board'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Board />
  },
  {
    path: '/404'
    // element: <NotFound />
  }
])
