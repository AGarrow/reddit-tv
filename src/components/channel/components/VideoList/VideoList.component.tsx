import React from 'react'

import { VideoBox } from '../VideoBox'
import type { videoType } from '../../../../types';
import './style.scss';

type VideoListProps = {
  videos: videoType[],
  loading: boolean,
  currentVideo: videoType,
}

export const VideoList = ({ videos, loading, currentVideo, }: VideoListProps) => {
  if (loading) { 
    return (
      <p> loading ... </p>
    )
  }

  return (
    <div>
      <ul className="video-list">
        {videos.map((video) => {
          const { thumbnail, title, name } = video.data;
          const isCurrent = name === currentVideo?.data?.name
          return (
            <VideoBox
              thumbnail={thumbnail}
              title={title}
              key={name}
              isCurrent={isCurrent}
            />
          )
        })
        }
      </ul>
    </div>
  )
}