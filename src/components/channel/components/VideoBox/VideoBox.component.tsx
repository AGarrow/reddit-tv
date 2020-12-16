import React from 'react'

type VideoBoxProps = {
  thumbnail: string,
  title: string,
  key: string,
}

export const VideoBox = ({ thumbnail, title, key }: VideoBoxProps) => {
  return (
    <li>
      <div>
        <div className="image-container">
          <img src={thumbnail} />
        </div>
        <p>{title}</p>
      </div>
    </li>
  )
}