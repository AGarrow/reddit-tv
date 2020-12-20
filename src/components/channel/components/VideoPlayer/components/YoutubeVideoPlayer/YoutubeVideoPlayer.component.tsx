import React from 'react'

type YoutubeVideoPlayerProps = {
  videoSource: string,
  onEnded: () => void
}

export const YoutubeVideoPlayer = ({ videoSource, onEnded }: YoutubeVideoPlayerProps) => {
  return (
    <div className="videoPlayer">
      <iframe src={videoSource}></iframe>
    </div>
    
  )
}