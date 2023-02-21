import React from 'react'
import './LoadingSkeleton.style.scss'

export function LoadingSkeleton() {
  return (
    <div className='LoadingSkeleton'>
      <div className='LoadingSkeleton__center'>
        <div className='LoadingSkeleton__logo'></div>
        <div className='LoadingSkeleton__bg'>
          <div className='LoadingSkeleton__progress'></div>
        </div>
      </div>
    </div>
  )
}
