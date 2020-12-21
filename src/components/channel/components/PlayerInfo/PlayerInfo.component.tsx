import { current } from '@reduxjs/toolkit';
import React from 'react'
import type { videoType } from '../../../../types';

type PlayerInfoProps = {
  currentVideo: videoType,
}

export const PlayerInfo = ({ currentVideo }: PlayerInfoProps) => {
  const title = currentVideo?.data?.title
  const permalink = currentVideo?.data?.permalink
    
  return (
    <div className="playerInfo">
      <h3>
        {currentVideo ? <a href={`https://reddit.com${permalink}`} target="_blank">{title}</a> : null}
      </h3>      
    </div>
  )
}