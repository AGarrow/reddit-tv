import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos, selectVideos } from './store/videos';
import { VideoList, VideoPlayer, VideoSelectButton } from './components'
import { current } from '@reduxjs/toolkit';

type ChannelProps = {
  id: string
}

export const Channel = ({ id }: ChannelProps) => {
  const dispatch = useDispatch();
  const { loading, videos } = useSelector(state => selectVideos(state, id))
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentVideo, setCurrentVideo] = useState()

  useEffect(() => {
    dispatch(fetchVideos(id)), []
  }, [id])

  useEffect(() => {
    if (videos) {
      setCurrentVideo(videos[currentVideoIndex])  
    }
  }, [id, currentVideoIndex, loading])
  
  const nextVideo = () => {
    setCurrentVideoIndex(currentVideoIndex + 1)
  }

  const previousVideo = () => {
    if(currentVideoIndex === 0) { return }
    setCurrentVideoIndex(currentVideoIndex - 1)
  }

  if (!videos && !loading) {
    return <div> initializing ... </div>
  }
  return (
    <div className="channel">
      <div> {id} </div>
      <VideoSelectButton role="previous" onClick={previousVideo}/>
      <VideoPlayer video={currentVideo} loading={loading && currentVideo === null} />
      <VideoSelectButton role="next" onClick={nextVideo}/>
      <VideoList videos={videos} loading={loading} currentVideo={currentVideo}/>
    </div>
  )
}