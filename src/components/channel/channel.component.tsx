import React from 'react'

type ChannelProps = {
  id: string
}

export const Channel = ({ id }: ChannelProps) => {
  return (
    <div> {id} </div>
  )
}