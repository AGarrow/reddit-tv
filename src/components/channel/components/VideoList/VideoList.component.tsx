import React from 'react'

import { VideoBox } from '../VideoBox'
import './style.scss';

type VideoListProps = {
  videos: [],
  loading: boolean
}

export const VideoList = ({ videos, loading }: VideoListProps) => {
  if (loading) { 
    return (
      <p> loading ... </p>
    )
  }
  if (!videos && !loading) {
    return (
      <p> initializing...</p>
    )
  }
  return (
    <ul className="video-list">
      {videos.map((video) => (
        <VideoBox thumbnail={video.data.thumbnail} title={video.data.title} key={video.data.name}/>
      ))}
    </ul>
  )
}