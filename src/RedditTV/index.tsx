import { current } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { Channel, ChannelSelector, VersionInfo } from '../components'

export const RedditTV = () => {
  const [currentChannelId, setCurrentChannelId] = useState('PublicFreakout')
  return (
    <div className="redditTVContainer">
      <div>
        <ChannelSelector currentChannelId={currentChannelId} setCurrentChannelId={setCurrentChannelId} />
        <Channel id={currentChannelId} />
      </div>
      <VersionInfo />
    </div>
  )
}