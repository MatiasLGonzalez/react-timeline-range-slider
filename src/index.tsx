import React from "react";
import PropTypes from "prop-types";
import { scaleTime } from "d3-scale";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import {
  format,
  addHours,
  startOfToday,
  endOfToday,
  differenceInMilliseconds,
  isBefore,
  isAfter,
  set,
  addMinutes,
} from "date-fns";

import SliderRail from "./components/SliderRail";
import Track from "./components/Track";
import Tick from "./components/Tick";
import Handle from "./components/Handle";

import "./styles/index.css";

type Interval = {
  start: Date;
  end: Date;
};

type UpdateCallbackData = {
  error: boolean;
  time: Date[];
};

interface TimeRangeProps {
  ticksNumber: number;
  selectedInterval?: Date[];
  timelineInterval?: Date[];
  disabledIntervals?: Interval[];
  containerClassName?: string;
  sliderRailClassName?: string;
  step?: number;
  formatTick?: (ms: number) => string;
  error?: boolean;
  mode?: number;
  onChangeCallback?: (formattedNewTime: [Date,Date]) => void;
  onUpdateCallback?: (data: UpdateCallbackData) => void;
  showNow: boolean;
}

const getTimelineConfig = (timelineStart: Date, timelineLength: number) => (date: Date) => {
	const percent = (differenceInMilliseconds(date, timelineStart) / timelineLength) * 100;
	const value = Number(format(date, 'T'));
	return { percent, value };
  };

const getFormattedBlockedIntervals = (blockedDates: Interval[] = [], [startTime, endTime]: Date[]) => {
	if (!blockedDates.length) return null;
  
	const timelineLength = differenceInMilliseconds(endTime, startTime);
	const getConfig = getTimelineConfig(startTime, timelineLength);
  
	const formattedBlockedDates = blockedDates.map((interval, index) => {
	  let { start, end } = interval;
  
	  if (isBefore(start, startTime)) start = startTime;
	  if (isAfter(end, endTime)) end = endTime;
  
	  const source = getConfig(start);
	  const target = getConfig(end);
  
	  return { id: `blocked-track-${index}`, source, target };
	});
  
	return formattedBlockedDates;
  };
  
  const getNowConfig = ([startTime, endTime]: Date[]) => {
	const timelineLength = differenceInMilliseconds(endTime, startTime);
	const getConfig = getTimelineConfig(startTime, timelineLength);
  
	const source = getConfig(new Date());
	const target = getConfig(addMinutes(new Date(), 1));
  
	return { id: 'now-track', source, target };
  };
  
class TimeRange extends React.Component<TimeRangeProps> {
  get disabledIntervals() {
    return getFormattedBlockedIntervals(
      this.props.disabledIntervals,
      this.props.timelineInterval
    );
  }

  get now() {
    return getNowConfig(this.props.timelineInterval);
  }

  onChange = (newTime) => {
    const formattedNewTime = newTime.map((t) => new Date(t));
    if (this.props.onChangeCallback) {
      this.props.onChangeCallback(formattedNewTime);
    }
  };

  checkIsSelectedIntervalNotValid = ([start, end], source, target) => {
    const { value: startInterval } = source;
    const { value: endInterval } = target;

    if (
      (startInterval > start && endInterval <= end) ||
      (startInterval >= start && endInterval < end)
    )
      return true;
    if (start >= startInterval && end <= endInterval) return true;

    const isStartInBlockedInterval =
      start > startInterval && start < endInterval && end >= endInterval;
    const isEndInBlockedInterval =
      end < endInterval && end > startInterval && start <= startInterval;

    return isStartInBlockedInterval || isEndInBlockedInterval;
  };

  onUpdate = (newTime) => {
    const { onUpdateCallback } = this.props;
    const disabledIntervals = this.disabledIntervals;
    if (!onUpdateCallback) {
      return;
    }

    if (disabledIntervals?.length) {
      const isValuesNotValid = disabledIntervals.some(({ source, target }) =>
        this.checkIsSelectedIntervalNotValid(newTime, source, target)
      );
      const formattedNewTime = newTime.map((t) => new Date(t));
      onUpdateCallback({ error: isValuesNotValid, time: formattedNewTime });
      return;
    }

    const formattedNewTime = newTime.map((t) => new Date(t));
    onUpdateCallback({ error: false, time: formattedNewTime });
  };

  getDateTicks = () => {
    const { timelineInterval, ticksNumber } = this.props;
    return scaleTime()
      .domain(timelineInterval)
      .ticks(ticksNumber)
      .map((t) => +t);
  };

  render() {
    const {
		sliderRailClassName,
		timelineInterval = [startOfToday(), endOfToday()],
		selectedInterval = [
		  set(new Date(), { minutes: 0, seconds: 0, milliseconds: 0 }),
		  set(addHours(new Date(), 1), { minutes: 0, seconds: 0, milliseconds: 0 }),
		],
		containerClassName,
		error = false,
		step = 1000 * 60 * 30,
		showNow,
		formatTick = (ms: number) => format(new Date(ms), 'HH:mm'),
		mode = 3,
	  } = this.props;

    const domain = timelineInterval.map((t) => Number(t));

    const disabledIntervals = this.disabledIntervals;

    return (
      <div
        className={
          containerClassName || "react_time_range__time_range_container"
        }
      >
        <Slider
          step={step}
          domain={domain}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={selectedInterval.map((t) => +t)}
          rootStyle={{ position: "relative", width: "100%" }}
        >
          <Rail>
            {({ getRailProps }) => (
              <SliderRail
                getRailProps={getRailProps}
              />
            )}
          </Rail>

          <Handles>
            {({ handles, getHandleProps }) => (
              <>
                {handles.map((handle) => (
                  <Handle
                    error={error}
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
                    error={error}
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
                  {disabledIntervals.map(({ id, source, target }) => (
                    <Track
					  error={error}
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                      disabled
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
				  error={error}
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
                    format={formatTick}
                  />
                ))}
              </>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export default TimeRange;
