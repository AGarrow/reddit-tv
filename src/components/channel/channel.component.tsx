import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos, selectVideos } from './store/videos';
import { VideoList, VideoPlayer } from './components'
import { current } from '@reduxjs/toolkit';

type ChannelProps = {
  id: string
}

export const Channel = ({ id }: ChannelProps) => {
  const dispatch = useDispatch();
  const { loading, videos } = useSelector(state => selectVideos(state, id))
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    dispatch(fetchVideos(id)), []
  }, [id])
  
  if (!videos && !loading) {
    return <div> initializing ... </div>
  }

  const currentVideo = () => videos[currentVideoIndex]
  return (
    <div className="channel">
      <div> {id} </div>
      <VideoPlayer video={currentVideo()} loading={loading && currentVideo === null}/>
      <VideoList videos={videos} loading={loading} currentVideo={currentVideo()}/>
    </div>
  )
}