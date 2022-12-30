import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Board } from './Board'
import { NotFound } from './NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Board />
  },
  {
    path: '*',
    element: <NotFound />
  }
])
