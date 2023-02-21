import React from 'react'
import { Services } from '/imports/services/client'
import { useAsync } from '/imports/hooks'
import { Navigate } from 'react-router-dom'
import { LoadingSkeleton } from './LoadingSkeleton'

export default function Home() {
  const ret = useAsync<string>(async () => {
    const { currentBoardId } = await Services.get('app').getAppState()
    return currentBoardId
  })

  if (ret.status === 'fulfilled' && ret.data != null) {
    const currentBoardId = ret.data
    return <Navigate to={`/board/${currentBoardId}`} replace={true} />
  }
  return <LoadingSkeleton />
}
