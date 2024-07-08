declare module '@floppychips/react-timeline-range-slider' {
  import * as React from 'react'

  export interface Interval {
    id: string
    start: Date
    end: Date
  }

  export interface UpdateCallbackData {
    error: boolean
    time: Date[]
  }

  export interface TimeRangeProps {
    ticksNumber?: number
    selectedInterval?: [Date, Date]
    timelineInterval?: [Date, Date]
    disabledIntervals?: Interval[]
    containerClassName?: string
    sliderRailClassName?: string
    tooltipClassName?: string
    step?: number
    formatTick?: (ms: number) => string
    error?: boolean
    mode?: number
    onChangeCallback: (formattedNewTime: [Date, Date]) => void
    onUpdateCallback: (data: UpdateCallbackData) => void
    onSlideStartCallback: (formattedNewTime: [Date, Date]) => void
    onSlideEndCallback: (formattedNewTime: [Date, Date]) => void
    showNow: boolean
    showTooltips: boolean
    successColor: string
    disabledColor: string
    height: string
    handleHeight: string
  }

  export class TimeRange extends React.Component<TimeRangeProps> {}

  export default TimeRange
}
