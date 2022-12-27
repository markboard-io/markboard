import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Board } from './board'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Board />
  },
  {
    path: 'about',
    element: <div>About</div>
  }
])
