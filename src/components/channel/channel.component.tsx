import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos, selectVideos } from './store/fetchVideos';
import { PlayerInfo, VideoList, VideoPlayer, VideoSelectButton } from './components'
import { current } from '@reduxjs/toolkit';
import './style.scss';

type ChannelProps = {
  id: string
}

export const Channel = ({ id }: ChannelProps) => {
  const dispatch = useDispatch();
  const { loading, videos, after } = useSelector(state => selectVideos(state, id))
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentVideo, setCurrentVideo] = useState()

  useEffect(() => {
    dispatch(fetchVideos(id, after)), []
    setCurrentVideoIndex(0);
  }, [id])

  const reloadChannel = () => {
    dispatch(fetchVideos(id, null))
  }

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

  const loadMore = useCallback(() => {
    dispatch(fetchVideos(id, after))
  }, [after])

  if (!videos && !loading) {
    return <div> initializing ... </div>
  }
  return (
    <div className="channelContainer">
      <div className="channel">
      <PlayerInfo channelId={id} currentVideo={currentVideo} reloadChannel={reloadChannel}/>
        <div className="playerWindow">
          <VideoSelectButton role="previous" onClick={previousVideo}/>
          <VideoPlayer
            video={currentVideo}
            loading={loading && currentVideo === null}
            onEnded={nextVideo}
          />
          <VideoSelectButton role="next" onClick={nextVideo}/>
        </div>
        <VideoList
          videos={videos}
          loading={loading}
          currentVideo={currentVideo}
          currentVideoIndex={currentVideoIndex}
          setCurrentVideoIndex={setCurrentVideoIndex}
          loadMore={loadMore}
        />
      </div>
    </div>
  )
}