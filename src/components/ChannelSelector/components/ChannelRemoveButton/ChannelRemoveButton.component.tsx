import React, { useState } from 'react'

type ChannelRemoveButtonProps = {
  removeChannel: () => void,
}

export const ChannelRemoveButton = ({ removeChannel }: ChannelRemoveButtonProps) => {
  const [clicked, setClicked] = useState(false);
  
  if (clicked) {
    return (
      <button
        onClick={removeChannel}
        onMouseLeave={() => setClicked(false)}
        className="removeChannel clicked"
      >
        remove
      </button>
    )
  }
  return (
    <button
      onClick={() => setClicked(true)}
      className="removeChannel"> x </button>
  )
}