import React from 'react'
import { scaleTime } from 'd3-scale'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import {
  format,
  addHours,
  startOfToday,
  endOfToday,
  differenceInMilliseconds,
  isBefore,
  isAfter,
  addMinutes,
} from 'date-fns'

import SliderRail from './SliderRail'
import Track from './Track'
import Tick from './Tick'
import Handle from './Handle'
import { TimeRangeContainer } from './StyledComponents'
import { DisabledInterval, UpdateCallbackData } from '../types'

interface TimeRangeProps {
  /** Number of steps on the timeline (the default value is 30 minutes) */
  ticksNumber?: number
  /** Selected interval inside the timeline */
  selectedInterval?: [Date, Date]
  /** Interval to display */
  timelineInterval?: [Date, Date]
  /** Array of disabled intervals inside the timeline */
  disabledIntervals?: DisabledInterval[]
  /** ClassName of the wrapping container */
  containerClassName?: string
  sliderRailClassName?: string
  /** Number of milliseconds between steps (the default value is 30 minutes) */
  step?: number
  /** Function that determines the format in which the date will be displayed */
  formatTick?: (ms: number) => string
  /** Is the selected interval is not valid */
  error?: boolean
  /** The interaction mode. Value of 1 will allow handles to cross each other.
   * Value of 2 will keep the sliders from crossing and separated by a step.
   * Value of 3 will make the handles pushable and keep them a step apart.
   * ADVANCED: You can also supply a function that will be passed the current
   * values and the incoming update. Your function should return what the state
   * should be set as. */
  mode?: number
  onChangeCallback: (formattedNewTime: [Date, Date]) => void
  onUpdateCallback: (data: UpdateCallbackData) => void
  /**
   * Set this variable to true if you want to show a line on the timeline that represents the current time.
   */
  showNow: boolean
}

const defaultProps: TimeRangeProps = {
  timelineInterval: [startOfToday(), endOfToday()],
  selectedInterval: [new Date(), addHours(new Date(), 1)],
  disabledIntervals: [],
  containerClassName: '',
  step: 1000 * 60 * 30, // 30 minutes in milliseconds
  ticksNumber: 48, // 30 minutes * 48 = 24 hours
  error: false,
  mode: 3,
  formatTick: (ms: number) => format(new Date(ms), 'HH:mm'),
  showNow: true,
  onChangeCallback: () => 'Change callback not set',
  onUpdateCallback: () => 'Update callback not set',
}

const getTimelineConfig = (timelineStart: Date, timelineLength: number) => (date: Date, idPrefix: string) => {
  const percent = (differenceInMilliseconds(date, timelineStart) / timelineLength) * 100
  const value = Number(format(date, 'T'))
  const id = `${idPrefix}-${value}`
  return { id, percent, value }
}

const getFormattedBlockedIntervals = (blockedDates: DisabledInterval[] = [], [startTime, endTime]: Date[]) => {
  if (!blockedDates.length) return null

  const timelineLength = differenceInMilliseconds(endTime, startTime)
  const getConfig = getTimelineConfig(startTime, timelineLength)

  const formattedBlockedDates = blockedDates.map((interval, index) => {
    let { start, end } = interval
    const { color } = interval

    if (isBefore(start, startTime)) start = startTime
    if (isAfter(end, endTime)) end = endTime

    const source = getConfig(start, 'blocked-start')
    const target = getConfig(end, 'blocked-end')

    return { id: `blocked-track-${index}`, source, target, color }
  })

  return formattedBlockedDates
}

const getNowConfig = ([startTime, endTime]: Date[]) => {
  const timelineLength = differenceInMilliseconds(endTime, startTime)
  const getConfig = getTimelineConfig(startTime, timelineLength)
  const source = getConfig(new Date(), 'now-start')
  const target = getConfig(addMinutes(new Date(), 1), 'now-end')
  return { id: 'now-track', source, target }
}

class TimeRange extends React.Component<TimeRangeProps> {
  static defaultProps: Partial<TimeRangeProps> = {
    timelineInterval: [startOfToday(), endOfToday()],
    selectedInterval: [new Date(), addHours(new Date(), 1)],
    disabledIntervals: [],
    containerClassName: '',
    step: 1000 * 60 * 30, // 30 minutes in milliseconds
    ticksNumber: 48, // 30 minutes * 48 = 24 hours
    error: false,
    mode: 3,
    formatTick: (ms: number) => format(new Date(ms), 'HH:mm'),
    showNow: true,
  }
  get disabledIntervals() {
    return getFormattedBlockedIntervals(
      this.props.disabledIntervals,
      this.props.timelineInterval ?? [startOfToday(), endOfToday()],
    )
  }

  get now() {
    return getNowConfig(this.props.timelineInterval ?? [startOfToday(), endOfToday()])
  }

  onChange = (newTime: ReadonlyArray<number>) => {
    const formattedNewTime = newTime.map((t) => new Date(t))
    if (this.props.onChangeCallback) {
      this.props.onChangeCallback([formattedNewTime[0], formattedNewTime[1]])
    }
  }

  checkIsSelectedIntervalNotValid = (
    [start, end]: [number, number],
    source: { value: number },
    target: { value: number },
  ) => {
    const { value: startInterval } = source
    const { value: endInterval } = target

    if ((startInterval > start && endInterval <= end) || (startInterval >= start && endInterval < end)) return true
    if (start >= startInterval && end <= endInterval) return true

    const isStartInBlockedInterval = start > startInterval && start < endInterval && end >= endInterval
    const isEndInBlockedInterval = end < endInterval && end > startInterval && start <= startInterval

    return isStartInBlockedInterval || isEndInBlockedInterval
  }

  onUpdate = (newTime: ReadonlyArray<number>) => {
    const { onUpdateCallback } = this.props
    const disabledIntervals = this.disabledIntervals
    if (!onUpdateCallback) {
      return
    }

    if (disabledIntervals?.length) {
      const isValuesNotValid = disabledIntervals.some(({ source, target }) =>
        this.checkIsSelectedIntervalNotValid([newTime[0], newTime[1]], source, target),
      )
      const formattedNewTime = newTime.map((t) => new Date(t))
      onUpdateCallback({ error: isValuesNotValid, time: formattedNewTime })
      return
    }

    const formattedNewTime = newTime.map((t) => new Date(t))
    onUpdateCallback({ error: false, time: formattedNewTime })
  }

  getDateTicks = () => {
    const { timelineInterval, ticksNumber } = this.props
    return scaleTime()
      .domain(timelineInterval ?? [startOfToday(), endOfToday()])
      .ticks(ticksNumber)
      .map((t) => +t)
  }

  render() {
    const {
      timelineInterval = defaultProps.timelineInterval,
      selectedInterval = defaultProps.selectedInterval,
      containerClassName = defaultProps.containerClassName,
      error = defaultProps.error,
      step = defaultProps.step,
      showNow = defaultProps.showNow,
      formatTick = defaultProps.formatTick,
    } = this.props

    const domain = (timelineInterval ?? [startOfToday(), endOfToday()]).map((t) => Number(t))

    const disabledIntervals = this.disabledIntervals

    return (
      <TimeRangeContainer className={containerClassName}>
        <Slider
          step={step}
          domain={domain.map((t) => +t)}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={(selectedInterval ?? [new Date(), addHours(new Date(), 1)]).map((t) => +t)}
          rootStyle={{ position: 'relative', width: '100%' }}
        >
          <Rail>{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}</Rail>

          <Handles>
            {({ handles, getHandleProps }) => (
              <>
                {handles.map((handle) => (
                  <Handle
                    error={error ?? false}
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </>
            )}
          </Handles>

          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <>
                {tracks?.map(({ id, source, target }) => (
                  <Track
                    error={error ?? false}
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </>
            )}
          </Tracks>

          {disabledIntervals?.length && (
            <Tracks left={false} right={false}>
              {({ getTrackProps }) => (
                <>
                  {disabledIntervals.map(({ id, source, target, color }) => (
                    <Track
                      error={error ?? false}
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                      disabled={true}
                      color={color} // Pass the color property here
                    />
                  ))}
                </>
              )}
            </Tracks>
          )}

          {showNow && (
            <Tracks left={false} right={false}>
              {({ getTrackProps }) => (
                <Track
                  error={error ?? false}
                  key={this.now?.id}
                  source={this.now?.source}
                  target={this.now?.target}
                  getTrackProps={getTrackProps}
                />
              )}
            </Tracks>
          )}

          <Ticks values={this.getDateTicks()}>
            {({ ticks }) => (
              <>
                {ticks.map((tick) => (
                  <Tick
                    key={tick.id}
                    tick={tick}
                    count={ticks.length}
                    format={formatTick ?? ((ms: number) => format(new Date(ms), 'HH:mm'))}
                  />
                ))}
              </>
            )}
          </Ticks>
        </Slider>
      </TimeRangeContainer>
    )
  }
}

TimeRange.defaultProps = defaultProps

export default TimeRange
