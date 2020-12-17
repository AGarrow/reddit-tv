import React, { Ref } from 'react'

type VideoBoxProps = {
  thumbnail: string,
  title: string,
  key: string,
  isCurrent: boolean
  reference?: any,
}

export const VideoBox = ({ thumbnail, title, key, isCurrent, reference }: VideoBoxProps) => {
  return (
    <li ref={reference} className={isCurrent ? "current" : null}>
      <div>
        <div className="image-container">
          <img src={thumbnail} />
        </div>
        <p>{title}</p>
      </div>
    </li>
  )
}