import React from 'react'
import { Icon } from '../../../../components/Icon'

type VideoSelectButtonProps = {
  role: "previous" | "next",
  onClick: () => void,
}

export const VideoSelectButton = ({ role, onClick }: VideoSelectButtonProps) => {
  return (
    <button onClick={onClick} className="videoSelectButton" role={role}>
      <Icon type={role} />
    </button>
  )
}