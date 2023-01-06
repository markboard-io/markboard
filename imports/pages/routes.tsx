import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Board } from './Board'
import { Login } from './Login'
import { Signup } from './Signup'
import { NotFound } from './NotFound'
import { Navigate } from 'react-router-dom'
import { ForgotPassword } from './ForgotPassword'
import { ResetPassword } from './ResetPassword'
import { Meteor } from 'meteor/meteor'

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
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />
  },
  {
    path: '*',
    element: <NotFound />
  }
])
