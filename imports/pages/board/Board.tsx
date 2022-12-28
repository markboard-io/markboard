import React, { useEffect } from 'react'
import styles from './Board.module.scss'
import { fabric } from 'fabric'
import { Sidebar } from '/imports/components'

export function Board() {
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas-container', {
      defaultCursor: 'default',
      renderOnAddRemove: false,
      imageSmoothingEnabled: false,
      backgroundColor: '#F8F8F8',
      skipOffscreen: true,
      preserveObjectStacking: true,
      selection: true,
      fireRightClick: true
    })
    const resizeCanvasToFitWindow = () => {
      canvas.setWidth(window.innerWidth)
      canvas.setHeight(window.innerHeight)
    }
    resizeCanvasToFitWindow()
    window.addEventListener('resize', resizeCanvasToFitWindow)
    window.canvas = canvas

    return () => {
      window.removeEventListener('resize', resizeCanvasToFitWindow)
    }
  }, [])

  return (
    <div className={styles.page}>
      <Sidebar />
      <canvas id='canvas-container' className={styles.canvasContainer} height='100%' width='100%' />
    </div>
  )
}
