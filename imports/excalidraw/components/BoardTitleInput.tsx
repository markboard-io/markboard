import React, { KeyboardEventHandler, memo, useEffect, useRef } from 'react'
import styles from './BoardTitleInput.module.scss'
import { Services } from '/imports/services/client'
import { getCurrentBoardId } from '/imports/utils/board'
import { usePrivateBoards } from '/imports/subscriptions'
import { useLocation } from 'react-router-dom'
import { globalEventEmitter } from '/imports/utils'
import { AppEvents } from '/imports/utils/constants'

export const BoardTitleInput = memo(() => {
  const location = useLocation()
  const privateBoards = usePrivateBoards()
  const $input = useRef<HTMLInputElement | null>(null)
  const $isTyping = useRef<boolean>(false)

  const changeBoardTitle = () => {
    const title = $input.current!.value
    const boardId = getCurrentBoardId()
    Services.get('board').changeBoardTitle(boardId, title)
  }

  const onFocus = () => {
    $isTyping.current = true
  }

  const onBlur = () => {
    $isTyping.current = false
    delete location.state.isNewBoard
    window.history.replaceState({}, document.title)
  }

  useEffect(() => {
    if (!$isTyping.current) {
      const element = $input.current!
      const currentBoard = privateBoards.find(board => board.id === getCurrentBoardId())
      element.value = currentBoard?.title ?? 'Untitled'
    }
  }, [privateBoards])

  const startEditingTitle = () => {
    $input.current?.focus()
    $input.current?.select()
  }

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = ev => {
    if (['Enter', 'Tab'].includes(ev.key)) {
      ev.preventDefault()
      const element = $input.current!
      const { x, y } = element.getBoundingClientRect()
      globalEventEmitter.emit(AppEvents.EDIT_BOARD, { x: x, y: y + 90 })
    }
  }

  const isInitialTitle = $input.current?.value === 'Untitled'
  const isNewBoard = location.state != null && location.state.isNewBoard
  if (isInitialTitle && isNewBoard) {
    // There's problems of when using useEffect(callback) with no deps
    // in a memo component. We use setTimeout with 100ms timeout to simulate
    // useEffect(callback), ensuring it was called after a render finished.
    setTimeout(() => {
      startEditingTitle()
      window.history.replaceState({}, document.title)
    }, 100)
  }

  return (
    <input
      type='text'
      className={styles.BoardTitleInput}
      onInput={changeBoardTitle}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      ref={$input}
    ></input>
  )
})
