import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import { SearchIcon } from '/imports/components/icons'
import styles from './FindAnything.module.scss'

export function FindAnything() {
  const [isFindAnythingModalOpen, setIsFindAnythingModalOpen] = useState(false)
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
              <input onClick={() => toggleFindAnythingModal()} ref={modalInputRef} placeholder='Find Anything'></input>
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
