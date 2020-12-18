import { current } from '@reduxjs/toolkit';
import React from 'react'
import type { videoType } from '../../../../types';

type PlayerInfoProps = {
  channelId: string,
  currentVideo: videoType,
  reloadChannel: () => void,
}

export const PlayerInfo = ({ channelId, currentVideo, reloadChannel }: PlayerInfoProps) => {
  const title = currentVideo?.data?.title
  const permalink = currentVideo?.data?.permalink
    
  return (
    <div className="playerInfo">
      <h3>{channelId}</h3>
      <h3>
        {currentVideo ? <h3><a href={`https://reddit.com${permalink}`} target="_blank">{title}</a></h3> : null}
      </h3>      
    </div>
  )
}