import React from 'react'
import { getMinutes } from 'date-fns'

import { TickLabel, TickMarker } from './StyledComponents'

interface TickProps {
  tick: {
    id: string
    value: number
    percent: number
  }
  count: number
  format: (value: number) => string
}

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
