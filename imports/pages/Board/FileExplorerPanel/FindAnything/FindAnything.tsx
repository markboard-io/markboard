import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import { SearchIcon } from '/imports/components/icons'
import styles from './FindAnything.module.scss'
import { Services } from '/imports/services/client'

export function FindAnything() {
  const [isFindAnythingModalOpen, setIsFindAnythingModalOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const modalInputRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>

  const toggleFindAnythingModal = () => {
    setIsFindAnythingModalOpen(!isFindAnythingModalOpen)
    console.log('toggleFindAnythingModal', isFindAnythingModalOpen)
  }

  useEffect(() => {
    if (isFindAnythingModalOpen) {
      modalInputRef.current.focus()
    }
  }, [isFindAnythingModalOpen])

  const searchAnything = () => {
    const searchTerm = modalInputRef.current.value
    const results = Services.get('board').searchBoards(searchTerm)
    console.log('searchAnything', results)
    setSearchResults(results)
  }

  return (
    <div>
      {isFindAnythingModalOpen ? (
        <div>
          <div className={styles.FindAnything}>
            {SearchIcon}
            <input onClick={() => toggleFindAnythingModal()} placeholder='Find Anything'></input>
          </div>
          <div className={styles.Modal}>
            <div className={styles.Modal_Content}>
              {SearchIcon}
              <input onClick={() => toggleFindAnythingModal()} onInput={searchAnything} ref={modalInputRef} placeholder='Find Anything'></input>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.FindAnything}>
          {SearchIcon}
          <input onClick={() => toggleFindAnythingModal()} placeholder='Find Anything'></input>
        </div>
      )}
    </div>
  )
}
