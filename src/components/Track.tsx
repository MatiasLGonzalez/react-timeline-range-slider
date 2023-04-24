import React from 'react'

import { StyledTrack } from './StyledComponents'

type TrackProps = {
  source: {
    id: string
    value: number
    percent: number
  }
  target: {
    id: string
    value: number
    percent: number
  }
  getTrackProps: () => any
  disabled?: boolean
  error: boolean
}

const Track: React.FC<TrackProps> = ({ error, source, target, getTrackProps, disabled }) => {
  return (
    <StyledTrack
      error={error}
      disabled={disabled}
      sourcePercent={source.percent}
      targetPercent={target.percent}
      {...getTrackProps()}
    />
  )
}

export default Track
