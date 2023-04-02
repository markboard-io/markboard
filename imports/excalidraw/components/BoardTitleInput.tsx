import React, { memo, useEffect, useRef } from 'react'
import styles from './BoardTitleInput.module.scss'
import { Services } from '/imports/services/client'
import { getCurrentBoardId } from '/imports/utils/board'
import { usePrivateBoards } from '/imports/subscriptions'

export const BoardTitleInput = memo(() => {
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
  }

  useEffect(() => {
    if (!$isTyping.current) {
      const element = $input.current!
      const currentBoard = privateBoards.find(board => board.id === getCurrentBoardId())
      element.value = currentBoard?.title ?? 'Untitled'
    }
  }, [privateBoards])

  return (
    <input
      type='text'
      className={styles.BoardTitleInput}
      onInput={changeBoardTitle}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={$input}
    ></input>
  )
})
