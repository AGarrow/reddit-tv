import React, { Dispatch, SetStateAction, useCallback, useEffect, useReducer } from 'react'
import { channelGroupType } from '../../types';

import {
  defaultChannels,
  sortChannels,
  addChannelToList,
  useKeyboardShortcut,
  useListSelector,  
} from '../../utils';
import { setCurrentVideoIndexAction } from '../Channel/store/fetchVideos';

import { ChannelList, ChannelSearch } from './components'

type ChannelSelectorProps = {
  setCurrentChannelId: Dispatch<SetStateAction<string>>,
  currentChannelId: string,
  addChannel: (channelId: string) => void,
  nextChannel: Dispatch<SetStateAction<void>>,
  previousChannel: Dispatch<SetStateAction<void>>,
  channelGroups: channelGroupType[]
}

export const ChannelSelector = ({
  setCurrentChannelId,
  currentChannelId,
  addChannel,
  nextChannel,
  previousChannel,
  channelGroups
}:
  ChannelSelectorProps) => {

  useKeyboardShortcut(['W', 'w', 'ArrowUp'], previousChannel)
  useKeyboardShortcut(['S', 's', 'ArrowDown'], nextChannel)

  return (
    <div className="channelListContainer">
      <h3>Channels</h3>
      <ChannelSearch addChannel={addChannel}/>
      {channelGroups?.map((group) => (
        <ChannelList
          key={group.name}
          title={group.name}
          channels={group.channels}
          setCurrentChannelId={setCurrentChannelId}
          currentChannelId={currentChannelId}
        />
      ))}
    </div>
  )
}