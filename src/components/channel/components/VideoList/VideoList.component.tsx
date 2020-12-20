import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { VideoBox } from '../VideoBox'
import type { videoType } from '../../../../types';
import { current } from '@reduxjs/toolkit';

type VideoListProps = {
  videos: videoType[],
  loading: boolean,
  currentVideo: videoType,
  currentVideoIndex: number,
  loadMore: () => void,
  setCurrentVideoIndex: Dispatch<SetStateAction<number>>
}

export const VideoList = ({
  videos,
  loading,
  currentVideo,
  loadMore,
  currentVideoIndex,
  setCurrentVideoIndex,
}: VideoListProps) => {
  const handleScroll = (e) => {
    const end = e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth;
    if (end) { loadMore() }
  }

  const currentRef = useRef(null);
  const listRef = useRef(null);
  const centerCurrentVideo = () => {
    if (currentRef.current && listRef?.current) {
      const li = currentRef.current;
      const margin = parseInt(window.getComputedStyle(li).marginLeft) * 2
      const ul = listRef.current;
      const listWidth = ul.clientWidth;
      
      const elementWidth = li.clientWidth + margin;
      const scrollPosition = (elementWidth * currentVideoIndex) - ((listWidth / 2) - (elementWidth / 2))
      if (scrollPosition > 0) {
        ul.scrollTo({ left: scrollPosition, top: 0, behavior: 'smooth'})  
      }
      else {
        ul.scrollTo({ left: 0, top: 0, behavior: 'smooth'})  
      }
    }
  }

  useEffect(() => {
    centerCurrentVideo();
  }, [currentVideo])

  return (
    <div className="videoListContainer">
      <ul className="videoList" onScroll={handleScroll} ref={listRef}>
        {videos?.map((video, index) => {
          const { thumbnail, title, name } = video.data;
          const isCurrent = name === currentVideo?.data?.name
          return (
            <VideoBox
              thumbnail={thumbnail}
              title={title}
              key={name}
              isCurrent={isCurrent}
              reference={isCurrent ? currentRef : null}
              onClick={() => setCurrentVideoIndex(index)}
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