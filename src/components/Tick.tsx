import React from 'react'
import { getMinutes } from 'date-fns'
import styled from '@emotion/styled'

interface TickProps {
  tick: {
    id: string
    value: number
    percent: number
  }
  count: number
  format: (value: number) => string
}

const TickMarker = styled.div<{ isFullHour: boolean }>`
  position: absolute;
  margin-top: ${({ isFullHour }) => (isFullHour ? '15px' : '20px')};
  width: 1px;
  height: ${({ isFullHour }) => (isFullHour ? '10px' : '5px')};
  background-color: #c8cacc;
  z-index: 2;
`

const TickLabel = styled.div`
  position: absolute;
  margin-top: 28px;
  font-size: 10px;
  text-align: center;
  z-index: 2;
  color: #77828c;
  font-family: sans-serif;
`

const Tick: React.FC<TickProps> = ({ tick, count, format }) => {
  const isFullHour = !getMinutes(tick.value)

  const tickLabelStyle = {
    marginLeft: `${-(100 / count) / 2}%`,
    width: `${100 / count}%`,
    left: `${tick.percent}%`,
  }

  return (
    <>
      <TickMarker isFullHour={isFullHour} style={{ left: `${tick.percent}%` }} />
      {isFullHour && <TickLabel style={tickLabelStyle}>{format(tick.value)}</TickLabel>}
    </>
  )
}

export default Tick
