import React, { Dispatch, SetStateAction } from 'react'
import type { channelType } from '../../../../types';
import { ChannelRemoveButton } from '../ChannelRemoveButton'
import { ChannelSelectButton } from '../ChannelSelectButton';

type ChannelListProps = {
  title: string,
  channels: channelType[],
  setCurrentChannelId: Dispatch<SetStateAction<string>>,
  currentChannelId: string,
  removeChannel: (channelId) => void
}

export const ChannelList = ({
  title,
  channels,
  setCurrentChannelId,
  currentChannelId,
  removeChannel
}: ChannelListProps) => {
  return (
    <div className="channelList">
      <h4>{ title }</h4>
      <ul>
        {channels.map((ch) => (
          <li key={ch.id} className={ch.id === currentChannelId ? "current" : null }>
            <ChannelSelectButton channelId={ch.id} setCurrentChannelId={setCurrentChannelId} />
            <ChannelRemoveButton removeChannel={() => removeChannel(ch.id)} />
          </li>
        ))}
      </ul>
    </div>
  )
}