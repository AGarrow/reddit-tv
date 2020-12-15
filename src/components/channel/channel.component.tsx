import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos, selectVideos } from './store/videos';
type ChannelProps = {
  id: string
}

export const Channel = ({ id }: ChannelProps) => {
  const dispatch = useDispatch();
  const videoList = useSelector(state => selectVideos(state, id))

  useEffect(() => {
    dispatch(fetchVideos(id)), []
  }, [id])
  
  return (
    <div>
      <div> {id} </div>
      <div>{videoList?.toString()}</div> 
    </div>
  )
}