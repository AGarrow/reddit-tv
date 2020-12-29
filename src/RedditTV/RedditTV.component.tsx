import { current } from '@reduxjs/toolkit';
import React, { useCallback, useEffect, useState } from 'react';
import { Channel, ChannelSelector, VersionInfo } from '../components';
import { useCookies } from 'react-cookie';
import { addChannelToList, sortChannels } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  setChannelsFromCookies,
  setDefaultChannels,
  setChannelId,
  setChannelIndex,
  nextChannel,
  previousChannel,
  selectCurrentChannelId,
  selectChannelGroups,
  isDefaultChannel
} from './store';

export const RedditTV = ({ }) => {
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(['my_channels']);
  const currentChannelId = useSelector(state => selectCurrentChannelId(state))
  const channelGroups = useSelector(state => selectChannelGroups(state))
  const isDefault = useSelector(state => isDefaultChannel(state))

  const myChannels = sortChannels(cookies['my_channels'] || [])

  const addChannelToCookies = (channelId) => {
    if (!isDefault(channelId)) {
      setCookies('my_channels', addChannelToList(myChannels, { id: channelId }))  
    }
    setCurrentChannelId(channelId);
  }

  const dispatchNextChannel = useCallback(() => {
    dispatch(nextChannel)
  }, [dispatch, nextChannel])

  const dispatchPreviousChannel = useCallback(() => { 
    dispatch(previousChannel)
  }, [dispatch, nextChannel])

  useEffect(() => {
    dispatch(setChannelsFromCookies(myChannels));
    dispatch(setChannelIndex);
  }, [cookies])

  useEffect(() => {
    dispatch(setDefaultChannels);
    setCurrentChannelId('toptalent')
  }, [])

  const setCurrentChannelId = useCallback((channelId) => {
    dispatch(setChannelId(channelId))
  }, [])

  return (
    <div className="redditTVContainer">
      <div>
        <ChannelSelector
          currentChannelId={currentChannelId}
          setCurrentChannelId={setCurrentChannelId}
          addChannel={addChannelToCookies}
          nextChannel={dispatchNextChannel}
          previousChannel={dispatchPreviousChannel}
          channelGroups={channelGroups}
        />
        {currentChannelId != null ? <Channel id={currentChannelId} /> : null}
      </div>
      <VersionInfo />
    </div>
  )
}