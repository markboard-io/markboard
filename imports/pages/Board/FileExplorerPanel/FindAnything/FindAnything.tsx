import React, { useState, useRef, useEffect, MutableRefObject, KeyboardEvent } from 'react'
import { SearchIcon } from '/imports/components/icons'
import styles from './FindAnything.module.scss'
import { Services } from '/imports/services/client'
import { useSwitchBoard } from '/imports/hooks'
import { SearchResults } from '/imports/models'
import { globalEventEmitter } from '/imports/utils'
import { EVENT } from '/imports/excalidraw/constants'
import { KEYS } from '/imports/excalidraw/keys'
import cx from 'classnames'

export function FindAnything() {
  const [isFindAnythingModalOpen, setIsFindAnythingModalOpen] = useState(false)
  const [candidateBoards, setCandidateBoards] = useState<SearchResults>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const input$ = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const switchBoard = useSwitchBoard()

  const toggleFindAnythingModal = () => {
    setIsFindAnythingModalOpen(!isFindAnythingModalOpen)
    setCandidateBoards([])
  }

  useEffect(() => {
    if (isFindAnythingModalOpen) {
      input$.current.focus()
    }
  }, [isFindAnythingModalOpen])

  const handleShortcuts = (ev: Event) => {
    const { ctrlKey, metaKey, key } = ev as unknown as KeyboardEvent

    // `Meta + P` open search modal if modal isn't open
    if (!isFindAnythingModalOpen && metaKey && key === 'p') {
      ev.preventDefault()
      setIsFindAnythingModalOpen(true)
    }

    // `Ctrl + P` to select previous item
    if (isFindAnythingModalOpen && ctrlKey && key === 'p') {
      ev.preventDefault()
      setActiveIndex(index => Math.max(0, index - 1))
    }

    // `Ctrl + N` to select next item
    if (isFindAnythingModalOpen && ctrlKey && key === 'n') {
      ev.preventDefault()
      setActiveIndex(index => Math.min(candidateBoards.length - 1, index + 1))
    }

    // `Escape` hide search modal if it's open
    if (isFindAnythingModalOpen && key === KEYS.ESCAPE) {
      setIsFindAnythingModalOpen(false)
    }

    // `Enter` to open selected board
    if (isFindAnythingModalOpen && key === KEYS.ENTER) {
      setIsFindAnythingModalOpen(false)
      const activeBoard = candidateBoards[activeIndex]
      if (activeBoard != null) {
        setCandidateBoards([])
        switchBoard(activeBoard.boardId)
      }
    }
  }

  useEffect(() => {
    globalEventEmitter.on(EVENT.KEYDOWN, handleShortcuts)
    return () => globalEventEmitter.off(EVENT.KEYDOWN, handleShortcuts)
  }, [isFindAnythingModalOpen])

  const searchBoards = async () => {
    const searchTerm = input$.current.value
    const results = await Services.get('board').searchBoards(searchTerm)
    setActiveIndex(0)
    setCandidateBoards(results)
  }

  return (
    <>
      <div className={styles.FindAnything} onClick={toggleFindAnythingModal}>
        {SearchIcon}
        <div className={styles.placeholder}>Find Anything</div>
      </div>
      {isFindAnythingModalOpen ? (
        <div className={styles.FindAnythingModal} onClick={toggleFindAnythingModal}>
          <div className={cx(styles.SearchBox, candidateBoards.length > 0 && styles.hasResults)}>
            {SearchIcon}
            <input
              onKeyDown={ev => handleShortcuts(ev.nativeEvent)}
              onInput={searchBoards}
              ref={input$}
              placeholder='Find Anything'
            />
          </div>
          {candidateBoards.length > 0 ? (
            <div className={styles.SearchResults}>
              {candidateBoards.map((result, index) => {
                return (
                  <div
                    key={index}
                    className={cx(styles.SearchResult, index === activeIndex && styles.active)}
                  >
                    <div onClick={() => switchBoard(result.boardId)}>
                      {result.titles
                        .split(new RegExp(`(${input$.current.value})`, 'gi'))
                        .map((part, index) => {
                          const isMatch = part.toLowerCase() === input$.current.value.toLowerCase()
                          if (isMatch) {
                            return (
                              <span key={index} style={{ fontWeight: 'bold' }}>
                                {part}
                              </span>
                            )
                          } else {
                            return part
                          }
                        })}
                    </div>
                    <div className={styles.SearchResultTexts}>
                      {result.validTexts.map((text, index) => {
                        const parts = text.split(new RegExp(`(${input$.current.value})`, 'gi'))
                        return (
                          <div key={index} className={styles.SearchResultText}>
                            {parts.map((part, index) => {
                              if (part.toLowerCase() === input$.current.value.toLowerCase()) {
                                return (
                                  <span key={index} style={{ fontWeight: 'bold' }}>
                                    {part}
                                  </span>
                                )
                              } else {
                                return part
                              }
                            })}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            []
          )}
        </div>
      ) : null}
    </>
  )
}
