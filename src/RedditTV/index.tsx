import { current } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { Channel, ChannelSelector } from '../components'
import './style.scss';

export const RedditTV = () => {
  const [currentChannelId, setCurrentChannelId] = useState('PublicFreakout')
  return (
    <div className="redditTVContainer">
      <div>
        <ChannelSelector currentChannelId={currentChannelId} setCurrentChannelId={setCurrentChannelId} />
          <Channel id={currentChannelId} />
      </div>
    </div>
  )
}