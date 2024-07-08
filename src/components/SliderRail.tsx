import React, { useCallback, useState } from 'react'

import { StyledInnerRailDiv, StyledOuterRailDiv } from './StyledComponents'
import { GetEventData, GetRailProps } from 'react-compound-slider'

interface SliderRailProps {
  activeHandleID: string
  getRailProps: GetRailProps
  getEventData: GetEventData
  height?: string
  sliderRailClassName?: string
  showTooltips: boolean
  tooltipClassName?: string
  format: (value: number) => string
}

export const SliderRail: React.FC<SliderRailProps> = ({
  activeHandleID,
  getRailProps,
  getEventData,
  height,
  sliderRailClassName,
  showTooltips,
  tooltipClassName,
  format,
}) => {
  const [currentValue, setCurrentValue] = useState<number | null>()
  const [currentPercentage, setCurrentPercentage] = useState<number | null>()

  const onMouseEnter = () => {
    document.addEventListener('mousemove', onMouseMove)
  }

  const onMouseLeave = () => {
    document.removeEventListener('mousemove', onMouseMove)
    setCurrentValue(null)
    setCurrentPercentage(null)
  }

  const onMouseMove = useCallback((e: Event) => {
    if (activeHandleID) {
      setCurrentValue(null)
      setCurrentPercentage(null)
    } else {
      setCurrentValue(getEventData(e).value)
      setCurrentPercentage(getEventData(e).percent)
    }
  }, [])

  return (
    <div className={sliderRailClassName}>
      <StyledOuterRailDiv {...getRailProps()} height={height} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      <StyledInnerRailDiv height={height} />
      {showTooltips && !activeHandleID && currentValue ? (
        <div
          style={{
            left: `${currentPercentage}%`,
            position: 'absolute',
          }}
        >
          <div className={tooltipClassName}>
            <span>{format(currentValue)}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SliderRail
