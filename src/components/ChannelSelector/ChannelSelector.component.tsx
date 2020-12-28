import React, { Dispatch, SetStateAction, useCallback, useEffect, useReducer } from 'react'
import { useCookies } from 'react-cookie';
import { createImportSpecifier } from 'typescript';

import {
  defaultChannels,
  sortChannels,
  addChannelToList,
  useKeyboardShortcut,
  useListSelector,  
} from '../../utils';

import { ChannelList, ChannelSearch } from './components'

type ChannelSelectorProps = {
  setCurrentChannelId: Dispatch<SetStateAction<string>>,
  currentChannelId: string,
}

export const ChannelSelector = ({ setCurrentChannelId, currentChannelId }: ChannelSelectorProps) => {
  const [cookies, setCookies] = useCookies(['my_channels']);
  const myChannels = sortChannels(cookies['my_channels'] || [])
  
  const addChannel = (channelId) => {
    setCookies('my_channels', addChannelToList(myChannels, { id: channelId }))
    setCurrentChannelId(channelId)
  }
  
  const allChannels = myChannels.concat(defaultChannels)
  const currentChannelIndex = allChannels.findIndex((c) => c.id === currentChannelId)
  
  const initialState = {
    index: currentChannelIndex
  }

  const setChannelByIndex = (channelIndex) => {
    setCurrentChannelId(allChannels[channelIndex].id)
  }
  const { next, previous } = useListSelector(currentChannelIndex, allChannels, setChannelByIndex)

  useKeyboardShortcut(['W', 'w', 'ArrowUp'], previous)
  useKeyboardShortcut(['S', 's', 'ArrowDown'], next)

  return (
    <div className="channelListContainer">
      <h3>Channels</h3>
      <ChannelSearch addChannel={addChannel}/>
      <ChannelList
        title='My Channels'
        channels={myChannels}
        setCurrentChannelId={setCurrentChannelId}
        currentChannelId={currentChannelId}
      />
      <ChannelList
        title='Suggested'
        channels={defaultChannels}
        setCurrentChannelId={setCurrentChannelId}
        currentChannelId={currentChannelId}
      />
    </div>
  )
}