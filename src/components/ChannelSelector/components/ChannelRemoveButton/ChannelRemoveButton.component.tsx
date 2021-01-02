import React, { useState } from 'react'
import { Icon } from '../../../../components/Icon';

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
        onTouchCancel={() => setClicked(false)}
        onBlur={() => setClicked(false)}
        className="removeChannel clicked"
      >
        remove
      </button>
    )
  }
  return (
    <button
      onClick={() => setClicked(true)}
      className="removeChannel">
      <Icon type='x' />
    </button>
  )
}