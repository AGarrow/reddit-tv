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
        {videos.map((video) => (
          <VideoBox thumbnail={video.data.thumbnail} title={video.data.title} key={video.data.name}/>
        ))}
      </ul>
    </div>
  )
}