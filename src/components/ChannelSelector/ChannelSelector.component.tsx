import React, { Dispatch, SetStateAction, useCallback, useEffect, useReducer, useState } from 'react'
import { channelGroupType } from '../../types';

import {  useKeyboardShortcut } from '../../utils';
import { Icon } from '../Icon';

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
  const [open, setOpen] = useState(false)

  useKeyboardShortcut(['W', 'w', 'ArrowUp'], previousChannel)
  useKeyboardShortcut(['S', 's', 'ArrowDown'], nextChannel)

  return (
    <div className="channelListContainer" data-open={open}>
      <div className="listHeader">
        <button className="toggleShow" onClick={() => setOpen(!open)}>
          <h3 id="channels">Channels</h3>
          <h3 id="currentChannel">{currentChannelId}</h3>
          <Icon type="chevron-left" />
        </button>
      </div>
      <div className="channelListContent">
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
    </div>
  )
}