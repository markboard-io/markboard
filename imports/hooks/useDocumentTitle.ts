import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prevDocumentTitle = document.title
    document.title = title
    return () => {
      document.title = prevDocumentTitle
    }
  }, [])

}