import React from 'react'

type LoadingIndicatorProps = {
  ready: boolean
}

export const LoadingIndicator = ({ ready }: LoadingIndicatorProps) => {
  return (
    <div> {ready} </div>
  )
}