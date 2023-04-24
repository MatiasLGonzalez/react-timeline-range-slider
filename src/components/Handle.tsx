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
}

const Handle: React.FC<HandleProps> = ({
  error,
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
}) => {
  const leftPosition = `${percent}%`

  return (
    <>
      <StyledHandleWrapper style={{ left: leftPosition }} {...getHandleProps(id)} />
      <StyledHandleContainer
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{ left: leftPosition }}
        disabled={disabled ?? false}
      >
        <StyledHandleMarker error={error} />
      </StyledHandleContainer>
    </>
  )
}

export default Handle
