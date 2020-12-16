import React from 'react'

type VideoBoxProps = {
  thumbnail: string,
  title: string,
  key: string,
  isCurrent: boolean
}

export const VideoBox = ({ thumbnail, title, key, isCurrent }: VideoBoxProps) => {
  return (
    <li className={isCurrent ? "current" : null}>
      <div>
        <div className="image-container">
          <img src={thumbnail} />
        </div>
        <p>{title}</p>
      </div>
    </li>
  )
}