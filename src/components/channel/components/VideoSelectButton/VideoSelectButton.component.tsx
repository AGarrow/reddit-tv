import React from 'react'
import { Icon } from '../../../../components/Icon'

type VideoSelectButtonProps = {
  role: "previous" | "next",
  onClick: () => void,
}

export const VideoSelectButton = ({ role, onClick }: VideoSelectButtonProps) => {
  return (
    <button onClick={onClick} className="videoSelectButton">
      <Icon type={role} />
    </button>
  )
}