import React, { Dispatch, SetStateAction, useCallback, useEffect, useReducer } from 'react'
import { channelGroupType } from '../../types';

import {  useKeyboardShortcut } from '../../utils';

import { ChannelList, ChannelSearch } from './components'

type ChannelSelectorProps = {
  setCurrentChannelId: Dispatch<SetStateAction<string>>,
  currentChannelId: string,
  addChannel: (channelId: string) => void,
  removeChannel: (channelId: string) => void,
  nextChannel: Dispatch<SetStateAction<void>>,
  previousChannel: Dispatch<SetStateAction<void>>,
  channelGroups: channelGroupType[]
}

export const ChannelSelector = ({
  setCurrentChannelId,
  currentChannelId,
  addChannel,
  removeChannel,
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
        group.channels?.length > 0 ?
        <ChannelList
          key={group.name}
          title={group.name}
          channels={group.channels}
          setCurrentChannelId={setCurrentChannelId}
          currentChannelId={currentChannelId}
          removeChannel={group.allowRemove ? removeChannel : null}
        /> : null
      ))}
    </div>
  )
}