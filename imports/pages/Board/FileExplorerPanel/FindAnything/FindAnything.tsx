import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import { SearchIcon } from '/imports/components/icons'
import styles from './FindAnything.module.scss'
import { Services } from '/imports/services/client'
import { BoardRecord } from '/imports/models'

export function FindAnything() {
  const [isFindAnythingModalOpen, setIsFindAnythingModalOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<BoardRecord[]>([])
  const modalInputRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>

  const toggleFindAnythingModal = () => {
    setIsFindAnythingModalOpen(!isFindAnythingModalOpen)
    setSearchResults([])
    console.log('toggleFindAnythingModal', isFindAnythingModalOpen)
  }

  useEffect(() => {
    if (isFindAnythingModalOpen) {
      modalInputRef.current.focus()
    }
  }, [isFindAnythingModalOpen])

  const searchAnything = async () => {
    const searchTerm = modalInputRef.current.value
    const results = await Services.get('board').searchBoards(searchTerm)
    console.log('searchAnything', results)
    setSearchResults(results)
  }

  return (
    <div>
      {isFindAnythingModalOpen ? (
        <div>
          <div className={styles.FindAnything}>
            {SearchIcon}
            <input onClick={() => toggleFindAnythingModal()} placeholder='Find Anything' />
          </div>
          <div className={styles.SearchContent}>
            <div className={styles.Modal}>
              <div className={styles.Modal_Content}>
                {SearchIcon}
                <input
                  onClick={() => toggleFindAnythingModal()}
                  onInput={searchAnything}
                  ref={modalInputRef}
                  placeholder='Find Anything'
                />
              </div>
              {searchResults.length > 0 ? (
                <div className={styles.SearchResults}>
                  <ul>
                    {searchResults.map(result => (
                      <li className={styles.SearchResult} key={result._id}>
                        {result.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                []
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.FindAnything}>
          {SearchIcon}
          <input onClick={() => toggleFindAnythingModal()} placeholder='Find Anything' />
        </div>
      )}
    </div>
  )
}
