import { useEffect, useState } from 'react'

type AsyncEffectState = {
  loading: boolean
  error?: Error
}

type AsyncEffectCallback = () => Promise<void>

export function useAsyncEffect(callback: AsyncEffectCallback, deps: any[]) {
  const [state, setState] = useState<AsyncEffectState>({
    loading: true
  })

  useEffect(() => {
    let isMounted = true

    setState({ loading: true })

    callback()
      .then(() => {
        if (isMounted) {
          setState({ loading: false })
        }
      })
      .catch((error: Error) => {
        if (isMounted) {
          setState({ loading: false, error })
        }
      })

    return () => {
      isMounted = false
    }
  }, deps)

  return state
}
