import React, { Dispatch, SetStateAction } from 'react'
import { useCookies } from 'react-cookie';

import { defaultChannels, sortChannels } from '../../utils';
import { ChannelList } from './components'

type ChannelSelectorProps = {
  setCurrentChannelId: Dispatch<SetStateAction<string>>,
  currentChannelId: string,
}

export const ChannelSelector = ({ setCurrentChannelId, currentChannelId }: ChannelSelectorProps) => {
  const [cookies, setCookies] = useCookies(['my_channels']);
  const myChannels = sortChannels(cookies['my_channels'] || [])

  return (
    <div className="channelListContainer">
      <h3>Channels</h3>
      <ChannelList
        title='My Channels'
        channels={myChannels}
        setCurrentChannelId={setCurrentChannelId}
        currentChannelId={currentChannelId}
      />
      <ChannelList
        title='Suggested'
        channels={defaultChannels()}
        setCurrentChannelId={setCurrentChannelId}
        currentChannelId={currentChannelId}
      />
    </div>
  )
}