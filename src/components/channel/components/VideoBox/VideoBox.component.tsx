import React, { Ref } from 'react'

type VideoBoxProps = {
  thumbnail: string,
  title: string,
  key: string,
  isCurrent: boolean
  reference?: any,
  onClick: () => void,
}

export const VideoBox = ({ thumbnail, title, isCurrent, reference, onClick }: VideoBoxProps) => {
  return (
    <li ref={reference} className={isCurrent ? "current" : null}>
      <button onClick={onClick}>
        <div className="image-container">
          <img src={thumbnail} />
        </div>
        <p>{title}</p>
      </button>
    </li>
  )
}