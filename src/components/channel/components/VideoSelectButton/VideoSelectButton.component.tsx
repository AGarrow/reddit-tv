import React from 'react'

type VideoSelectButtonProps = {
  role: "previous" | "next",
  onClick: () => void,
}

export const VideoSelectButton = ({ role, onClick }: VideoSelectButtonProps) => {
  return (
    <button onClick={onClick} className="videoSelectButton"> {role} </button>
  )
}