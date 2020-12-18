import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import type { videoType } from '../../../../types';

type VideoPlayerProps = {
  video?: videoType,
  loading: boolean,
  onEnded: () => void,
}

export const VideoPlayer = ({ video, loading, onEnded }: VideoPlayerProps) => {
  if (loading || video == null) {
    return <div> loading ... </div>
  }

  const videoData = video?.data;
  const videoSource = videoData.secure_media.reddit_video.fallback_url;
  
  // this is hacky as all heck but the only way to get audio to play that I can see
  const audioSource = videoSource.replace(/DASH_.*/, 'DASH_audio.mp4')

  const audioRef = useRef(null)
  const videoRef = useRef(null)

  const playAudio = () => {
    audioRef.current.play();
  }

  const pauseAudio = () => {
    audioRef.current.pause()
    syncAudio()
  }

  const syncAudio = () => {
    audioRef.current.currentTime = videoRef.current.currentTime
    syncAudio()
  }

  useEffect(() => {
    audioRef.current.play();
    videoRef.current.play();
  }, [video])

  return (
    <div className="videoPlayer">
      <video
        controls
        onPlay={playAudio}
        onPause={pauseAudio}
        onSeeking={syncAudio}
        onEnded={onEnded}
        name="media"
        src={videoSource}
        ref={videoRef}
      >
      </video>
      <audio src={audioSource} ref={audioRef}>
      </audio>

    </div>
  )
}