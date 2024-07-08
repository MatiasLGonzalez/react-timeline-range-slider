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
  disabledColor?: string
  successColor?: string
  height?: string
}

const Track: React.FC<TrackProps> = ({
  error,
  source,
  target,
  getTrackProps,
  disabled,
  disabledColor,
  successColor,
  height,
}) => {
  return (
    <StyledTrack
      error={error}
      disabled={disabled}
      sourcePercent={source.percent}
      targetPercent={target.percent}
      {...getTrackProps()}
      disabledColor={disabledColor}
      successColor={successColor}
      height={height}
    />
  )
}

export default Track
