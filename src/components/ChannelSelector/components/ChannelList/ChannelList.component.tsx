import React, { Dispatch, SetStateAction } from 'react'
import type { channelType } from '../../../../types';

type ChannelListProps = {
  title: string,
  channels: channelType[],
  setCurrentChannelId: Dispatch<SetStateAction<string>>,
  currentChannelId: string,
}

export const ChannelList = ({ title, channels, setCurrentChannelId, currentChannelId }: ChannelListProps) => {
  return (
    <div className="channelList">
      <h4>{ title }</h4>
      <ul>
        {channels.map((ch) => (
          <li key={ch.id} className={ch.id === currentChannelId ? "current" : null }>
            <button onClick={() => setCurrentChannelId(ch.id)}>
              {ch.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}