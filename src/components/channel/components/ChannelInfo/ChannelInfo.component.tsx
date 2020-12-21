import React from 'react'

type ChannelInfoProps = {
  channelId: string,
  reloadChannel: () => void,
}

export const ChannelInfo = ({ channelId, reloadChannel }: ChannelInfoProps) => {
  return (
    <div className="channelInfo">
      <h3> {channelId} </h3>
    </div>
  )
}