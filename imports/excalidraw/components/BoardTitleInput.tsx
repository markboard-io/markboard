import React, { useEffect, useRef } from 'react'
import styles from './BoardTitleInput.module.scss'
import { throttle } from 'lodash'
import { Services } from '/imports/services/client'
import { getCurrentBoardId } from '/imports/utils/board'
import { usePrivateBoards } from '/imports/subscriptions'

export const BoardTitleInput = () => {
  const privateBoards = usePrivateBoards()
  const $input = useRef<HTMLInputElement | null>(null)

  const changeBoardTitle = throttle(() => {
    const title = $input.current!.value
    const boardId = getCurrentBoardId()
    Services.get('board').changeBoardTitle(boardId, title)
  }, 200)

  const currentBoard = privateBoards.find(({ id }) => id === getCurrentBoardId())
  console.log('currentBoard2', currentBoard)

  useEffect(() => {
    const currentBoard = privateBoards.find(({ id }) => id === getCurrentBoardId())
    console.log('currentBoard', currentBoard)
    if (currentBoard != null) {
      const element = $input.current!
      element.value = currentBoard.title ?? 'Untitled'
    }
  }, [privateBoards])

  return (
    <input
      type='text'
      className={styles.BoardTitleInput}
      onInput={changeBoardTitle}
      ref={$input}
    ></input>
  )
}
