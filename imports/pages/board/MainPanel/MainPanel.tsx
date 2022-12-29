import './MainPanel.style.scss'
import React, { useEffect } from 'react'
import { Panel } from 'react-resizable-panels'
import { fabric } from 'fabric'
import { ExcalidrawApp } from '/imports/excalidraw'

export function MainPanel() {
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
    <Panel>
      <ExcalidrawApp />
    </Panel>
  )
}
