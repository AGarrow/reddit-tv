import React, { useCallback, useEffect, useState } from 'react';
import { Channel, ChannelSelector } from '../components';
import { useCookies } from 'react-cookie';
import { sortChannels } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  setChannelsFromCookies,
  setDefaultChannels,
  setChannelId,
  setChannelIndex,
  nextChannel,
  previousChannel,
  addChannel,
  removeChannel,
  selectCurrentChannelId,
  selectChannelGroups,
  selectChannelGroup,
  isDefaultChannel
} from './store';

export const RedditTV = ({ }) => {
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(['my_channels']);
  const currentChannelId = useSelector(state => selectCurrentChannelId(state))
  const channelGroups = useSelector(state => selectChannelGroups(state))
  const channelGroup = useSelector(state => selectChannelGroup(state))
  const isDefault = useSelector(state => isDefaultChannel(state))

  const dispatchAddChannel = useCallback((channelId) => {
    if (!isDefault(channelId)) {
      dispatch(addChannel(channelId))
    }
    setCurrentChannelId(channelId);
  }, [])

  const dispatchRemoveChannel = useCallback((channelId) => {
    dispatch(removeChannel(channelId))
  }, [])

  const dispatchNextChannel = useCallback(() => {
    dispatch(nextChannel)
  }, [dispatch, nextChannel])

  const dispatchPreviousChannel = useCallback(() => { 
    dispatch(previousChannel)
  }, [dispatch, nextChannel])

  const cookieChannels = channelGroup('cookies')?.channels
  useEffect(() => {
    if (cookieChannels == null) return;
    setCookies('my_channels', cookieChannels)
    dispatch(setChannelIndex);
  }, [cookieChannels])

  useEffect(() => {
    const myChannels = sortChannels(cookies['my_channels'] || [])

    dispatch(setDefaultChannels);
    dispatch(setChannelsFromCookies(myChannels));
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
          addChannel={dispatchAddChannel}
          removeChannel={dispatchRemoveChannel}
          nextChannel={dispatchNextChannel}
          previousChannel={dispatchPreviousChannel}
          channelGroups={channelGroups}
        />
        {currentChannelId != null ? <Channel id={currentChannelId} /> : null}
      </div>
    </div>
  )
}