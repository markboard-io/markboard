import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { LoadingSkeleton } from './LoadingSkeleton'
import { useStore } from '/imports/store'
import { Services } from '../services/client'

export default function Home() {
  const { currentBoardId } = useStore(state => state.appState)
  const setAppState = useStore(state => state.setAppState)

  useEffect(() => {
    Services.get('app').getAppState().then(setAppState)
  }, [])

  if (currentBoardId) {
    return <Navigate to={`/board/${currentBoardId}`} replace={true} />
  }
  return <LoadingSkeleton />
}
