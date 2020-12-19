import React from 'react'

export const VersionInfo = ({ }) => {
  if (process.env.TARGET_ENV !== 'staging') {
    return null
  }

  return (
    <div className="version">{ process.env.VERSION }</div>
  )
}