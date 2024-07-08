import React from 'react'

import { StyledHandleContainer, StyledHandleMarker, StyledHandleWrapper } from './StyledComponents'

interface HandleProps {
  error: boolean
  domain: number[]
  handle: {
    id: string
    value: number
    percent: number
  }
  getHandleProps: (id: string) => any
  disabled?: boolean
  disabledColor: string
  successColor: string
  height?: string
}

const Handle: React.FC<HandleProps> = ({
  error,
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
  disabledColor,
  successColor,
  height,
}) => {
  const leftPosition = `${percent}%`

  return (
    <>
      <StyledHandleWrapper style={{ left: leftPosition }} {...getHandleProps(id)} height={height} />
      <StyledHandleContainer
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{ left: leftPosition }}
        disabled={disabled ?? false}
        height={height}
      >
        <StyledHandleMarker error={error} disabledColor={disabledColor} successColor={successColor} />
      </StyledHandleContainer>
    </>
  )
}

export default Handle
