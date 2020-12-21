import React, { useCallback, useEffect, useRef } from 'react';

type RedditVideoPlayerProps = {
  videoSource: string,
  onEnded: () => void,
}

export const RedditVideoPlayer = ({ videoSource, onEnded }: RedditVideoPlayerProps) => {
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
  }

  const startPlaying = useCallback(() => {
    videoRef.current.play()
    playAudio()
  }, [videoSource])

  return (
    <div className="videoPlayer">
      <video
        controls
        onPlay={playAudio}
        onCanPlay={startPlaying}
        onPause={pauseAudio}
        onSeeked={syncAudio}
        onEnded={onEnded}
        playsInline
        src={videoSource}
        ref={videoRef}
      >
      </video>
      <audio src={audioSource} ref={audioRef}>
      </audio>

    </div>
  )
}