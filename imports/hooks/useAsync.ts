import { useState, useEffect, useCallback } from 'react'

type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'fulfilled'; data: T }
  | { status: 'rejected'; error: unknown }

type AsyncFn<T> = () => Promise<T>

export function useAsync<T>(asyncFunction: AsyncFn<T>, immediate = true) {
  const [asyncState, setAsyncState] = useState<AsyncState<T>>({ status: 'idle' })

  const execute = useCallback(async () => {
    setAsyncState({ status: 'pending' })

    try {
      const data = await asyncFunction()
      setAsyncState({ status: 'fulfilled', data })
    } catch (error) {
      if (error instanceof Error) {
        setAsyncState({ status: 'rejected', error })
      } else {
        setAsyncState({ status: 'rejected', error: new Error('Unknown error occurred') })
      }
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, ...asyncState }
}
