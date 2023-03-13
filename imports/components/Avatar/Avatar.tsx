import './Avatar.style.scss'
import cx from 'clsx'

import React, { useState } from 'react'
import { getClientInitials } from '/imports/utils/clients'

type AvatarProps = {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  color: string
  border: string | null
  name: string
  src?: string
  className?: string
}

export const Avatar = ({
  color,
  onClick = () => {},
  name,
  src,
  className = '',
  border
}: AvatarProps) => {
  const shortName = getClientInitials(name)
  const [error, setError] = useState(false)
  const avatarImage = !error && src
  const style = avatarImage ? undefined : { background: color }

  return (
    <div
      className={cx('Avatar', className, { AvatarBoarder: border != null })}
      style={style}
      onClick={onClick}
    >
      {avatarImage ? (
        <img
          src={src}
          alt={shortName}
          referrerPolicy='no-referrer'
          onError={() => setError(true)}
        />
      ) : (
        shortName
      )}
    </div>
  )
}
