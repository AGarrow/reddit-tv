import React from 'react'

import type { videoType } from '../../../../types';

type VideoPlayerProps = {
  video?: videoType,
  loading: boolean
}

export const VideoPlayer = ({ video, loading }: VideoPlayerProps) => {
  if (loading || video == null) {
    return <div> loading ... </div>
  }

  const videoData = video?.data;
  const source = videoData.secure_media.reddit_video.fallback_url; 

  return (
    <div>
      <video controls autoPlay muted name="media">
        <source src={source} />
      </video>
    </div>
  )
}