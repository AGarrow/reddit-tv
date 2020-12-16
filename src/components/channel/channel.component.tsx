import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos, selectVideos } from './store/videos';
import { VideoList } from './components'

type ChannelProps = {
  id: string
}

export const Channel = ({ id }: ChannelProps) => {
  const dispatch = useDispatch();
  const { loading, videos } = useSelector(state => selectVideos(state, id))

  useEffect(() => {
    dispatch(fetchVideos(id)), []
  }, [id])
  
  return (
    <div className="channel">
      <div> {id} </div>
      <VideoList videos={videos} loading={loading}/>
    </div>
  )
}