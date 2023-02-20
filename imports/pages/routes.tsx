import React, { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

const Home = lazy(() => import('./Home'))
const Board = lazy(() => import('./Board'))
const Login = lazy(() => import('./Login'))
const Signup = lazy(() => import('./Signup'))
const NotFound = lazy(() => import('./NotFound'))
const ForgotPassword = lazy(() => import('./ForgotPassword'))
const ResetPassword = lazy(() => import('./ResetPassword'))

export interface IRouteRequirements {
  needLogin: boolean
  permissions: [] /* TODO: update it when role-based permission is introduced */
}

type LazyComponent<T> = React.FC<T> & { lazy?: boolean }

function suspense<T extends {}>(Component: LazyComponent<T>, props?: T) {
  const defaultProps = { ...props } as T
  return (
    <Suspense fallback={null}>
      <Component {...defaultProps} />
    </Suspense>
  )
}

const withRouteProtected = (
  element: JSX.Element,
  requirements: IRouteRequirements = { needLogin: true, permissions: [] }
) => {
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isLogged = Meteor.userId() != null

    if (requirements.needLogin && !isLogged) {
      return <Navigate to='/login' />
    }
    return <>{children}</>
  }

  return <ProtectedRoute>{element}</ProtectedRoute>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: withRouteProtected(suspense(Home))
  },
  {
    path: '/board/:id',
    element: withRouteProtected(suspense(Board))
  },
  {
    path: '/login',
    element: suspense(Login)
  },
  {
    path: '/signup',
    element: suspense(Signup)
  },
  {
    path: '/forgot-password',
    element: suspense(ForgotPassword)
  },
  {
    path: '/reset-password/:token',
    element: suspense(ResetPassword)
  },
  {
    path: '*',
    element: suspense(NotFound)
  }
])
