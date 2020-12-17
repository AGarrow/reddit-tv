import React from 'react'

import { VideoBox } from '../VideoBox'
import type { videoType } from '../../../../types';
import './style.scss';

type VideoListProps = {
  videos: videoType[],
  loading: boolean,
  currentVideo: videoType,
  loadMore: () => void,
}

export const VideoList = ({ videos, loading, currentVideo, loadMore, }: VideoListProps) => {
  const handleScroll = (e) => {
    const end = e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth;
    if (end) { loadMore() }
  }

  return (
    <div>
      <ul className="video-list" onScroll={handleScroll}>
        {videos?.map((video) => {
          const { thumbnail, title, name } = video.data;
          const isCurrent = name === currentVideo?.data?.name
          return (
            <VideoBox
              thumbnail={thumbnail}
              title={title}
              key={name}
              isCurrent={isCurrent}
            />
          )
        })
        }
        <li className="loading">
          loading...
        </li>
      </ul>
    </div>
  )
}