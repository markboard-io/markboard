import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Board } from './Board'
import { Login } from './Login'
import { NotFound } from './NotFound'
import { Meteor } from 'meteor/meteor'
import { Navigate } from 'react-router-dom'

export interface IRouteRequirements {
  needLogin: boolean
  permissions: [] /* TODO: update it when role-based permission is introduced */
}

const withRouteProtected = (
  Component: React.ComponentType,
  requirements: IRouteRequirements = { needLogin: true, permissions: [] }
) => {
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isLogged = Meteor.userId() != null

    if (requirements.needLogin && !isLogged) {
      return <Navigate to='/login' />
    }
    return <>{children}</>
  }

  return (
    <ProtectedRoute>
      <Component />
    </ProtectedRoute>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: withRouteProtected(Board)
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
])
