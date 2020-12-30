import React, { Dispatch, SetStateAction } from 'react'

type ChannelSelectButtonProps = {
  channelId: string,
  setCurrentChannelId: Dispatch<SetStateAction<string>>,
}

export const ChannelSelectButton = ({ channelId, setCurrentChannelId, }: ChannelListButtonProps) => {
  return (
    <button className="channelListButton" onClick={() => setCurrentChannelId(channelId)}>
      {channelId}
    </button>
  )
}