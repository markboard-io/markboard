import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import { SearchIcon } from '/imports/components/icons'
import styles from './FindAnything.module.scss'
import { Services } from '/imports/services/client'
import { useSwitchBoard } from '/imports/hooks'

export function FindAnything() {
  const [isFindAnythingModalOpen, setIsFindAnythingModalOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const modalInputRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const switchBoard = useSwitchBoard()

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
    const searchArray = results.titles.concat(...results.validTexts)
    setSearchResults(searchArray)
    console.log('searchAnything', searchArray)
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
                <>
                  <div className={styles.SearchResults}>
                    {searchResults.map((result, index) => {
                      return (
                        <div
                          key={index}
                          className={styles.SearchResult}
                          onClick={() => {
                            switchBoard(result)
                            toggleFindAnythingModal()
                          }}
                        >
                          {result}
                        </div>
                      )
                    })}
                  </div>
                </>
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
