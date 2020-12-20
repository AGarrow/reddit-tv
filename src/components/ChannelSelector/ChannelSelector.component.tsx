import React, { Dispatch, SetStateAction } from 'react'
import { defaultChannels } from '../../utils';

type ChannelSelectorProps = {
  setCurrentChannelId: Dispatch<SetStateAction<string>>,
  currentChannelId: string,
}

export const ChannelSelector = ({ setCurrentChannelId, currentChannelId }: ChannelSelectorProps) => {
  return (
    <div className="channelListContainer">
      <h3>Channels</h3>
      <ul>
        {defaultChannels().map((ch) => (
          <li className={ch.id === currentChannelId ? "current" : null }>
            <button onClick={() => setCurrentChannelId(ch.id)}>
              {ch.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}