declare module '@matiaslgonzalez/react-timeline-range-slider' {
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
    step?: number
    formatTick?: (ms: number) => string
    error?: boolean
    mode?: number
    onChangeCallback: (formattedNewTime: [Date, Date]) => void
    onUpdateCallback: (data: UpdateCallbackData) => void
    showNow: boolean
  }

  export class TimeRange extends React.Component<TimeRangeProps> {}

  export default TimeRange
}
