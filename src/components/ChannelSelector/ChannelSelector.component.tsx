import React, { Dispatch, SetStateAction, useCallback, useEffect, useReducer } from 'react'
import { useCookies } from 'react-cookie';
import { createImportSpecifier } from 'typescript';

import { defaultChannels, sortChannels, addChannelToList, useKeyboardShortcut, excludeInputTarget } from '../../utils';
import { nextVideoAction } from '../Channel/store/fetchVideos';
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

  const channelSelectionReducer = (state, action) => {
    switch (action.type) {
      case 'next':
        return state.index >= allChannels.length - 1 ? state : { index: state.index + 1 }
      case 'previous':
        return state.index > 0 ? { index: state.index - 1 } : state
      default: 
        return state
    }
  }

  const [channelIndexState, dispatch] = useReducer(channelSelectionReducer, initialState)
  
  const nextChannel = useCallback(() => {
    dispatch({ type: 'next' })
  }, [])

  const previousChannel = useCallback(() => {
    dispatch({ type: 'previous' })
  }, [])

  useKeyboardShortcut(['W', 'w', 'ArrowUp'], previousChannel)
  useKeyboardShortcut(['S', 's', 'ArrowDown'], nextChannel)

  useEffect(() => {
    const indexId = allChannels[channelIndexState.index].id
    if (indexId !== currentChannelId) {
      setCurrentChannelId(indexId)
    }
  }, [channelIndexState.index])

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