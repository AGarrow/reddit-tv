import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchVideos,
  selectVideos,
  selectCurrentVideo,
  selectCurrentVideoIndex,
  setCurrentVideoIndexAction,
  nextVideoAction,
  previousVideoAction
} from './store/fetchVideos';
import {
  ChannelInfo,
  PlayerInfo,
  VideoList,
  VideoPlayer,
  VideoSelectButton
} from './components'
import { current } from '@reduxjs/toolkit';
import { useKeyboardShortcut } from '../../utils';

type ChannelProps = {
  id: string
}

export const Channel = ({ id }: ChannelProps) => {
  const dispatch = useDispatch();
  const { loading, videos, after } = useSelector(state => selectVideos(state, id))
  const { currentVideoIndex } = useSelector(state => selectCurrentVideoIndex(state, id))
  const { currentVideo } = useSelector(state => selectCurrentVideo(state, id))
  
  const nextVideo = useCallback(() => {
    dispatch(nextVideoAction(id));
  }, [dispatch, nextVideoAction, id])

  const previousVideo = useCallback(() => {
    dispatch(previousVideoAction(id));
  }, [dispatch, previousVideoAction, id])

  useKeyboardShortcut(['ArrowRight', 'D', 'd'], nextVideo);
  useKeyboardShortcut(['ArrowLeft', 'A', 'a'], previousVideo)
  
  useEffect(() => {
    dispatch(fetchVideos(id, after)), []
  }, [id])

  const reloadChannel = () => {
    dispatch(fetchVideos(id, null))
  }

  const loadMore = useCallback(() => {
    dispatch(fetchVideos(id, after))
  }, [after])

  const setCurrentVideoIndex = useCallback((index) => {
    dispatch(setCurrentVideoIndexAction(id, index))
  }, [id, dispatch, setCurrentVideoIndexAction])

  if (!videos && !loading) {
    return <div> initializing ... </div>
  }
  return (
    <div className="channelContainer">
      <div className="channel">
        <ChannelInfo channelId={id} reloadChannel={reloadChannel}/>
        <div className="playerWindow">
          <VideoSelectButton
            role="previous"
            onClick={previousVideo}
          />
          <VideoPlayer
            video={currentVideo}
            loading={loading && currentVideo === null}
            onEnded={nextVideo}
          />
          <VideoSelectButton role="next" onClick={nextVideo}/>
        </div>
        <PlayerInfo currentVideo={currentVideo} />
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