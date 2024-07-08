### react-timeline-range-slider

Fork of @matiaslgonzalez/react-timeline-range-slider to support single time selection

![demo gif](./demo.gif)

### Installation

     npm i @floppychips/react-timeline-range-slider

### Props

| Prop                 | Type               | Default                               | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------- | ------------------ | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| timelineInterval     | array              | [startOfToday(), endOfToday()]        | Interval to display                                                                                                                                                                                                                                                                                                                                                                          |
| selectedInterval     | array [Date, Date] | [new Date(), addHours(new Date(), 1)] | timeline, or single value for single selection                                                                                                                                                                                                                                                                                                                                               |
| disabledIntervals    | array              | []                                    | Array of disabled intervals inside the timeline                                                                                                                                                                                                                                                                                                                                              |
| containerClassName   | string             |                                       | ClassName of the wrapping container                                                                                                                                                                                                                                                                                                                                                          |
| sliderRailClassName  | string             |                                       | ClassName of the slider container                                                                                                                                                                                                                                                                                                                                                            |
| tooltipClassName     | string             |                                       | ClassName of the tooltip container                                                                                                                                                                                                                                                                                                                                                           |
| step                 | number             | 1800000                               | Number of milliseconds between steps (the default value is 30                                                                                                                                                                                                                                                                                                                                | minutes) |
| ticksNumber          | number             | 48                                    | Number of steps on the timeline (the default value is 30 minutes)                                                                                                                                                                                                                                                                                                                            |
| error                | bool               | false                                 | Is the selected interval is not valid                                                                                                                                                                                                                                                                                                                                                        |
| mode                 | int/function       | 3                                     | The interaction mode. Value of 1 will allow handles to cross each other. Value of 2 will keep the sliders from crossing and separated by a step. Value of 3 will make the handles pushable and keep them a step apart. ADVANCED: You can also supply a function that will be passed the current values and the incoming update. Your function should return what the state should be set as. |
| formatTick           | function           | ms => format(new Date(ms), 'HH:mm')   | Function that determines the format in which the date will be displayed                                                                                                                                                                                                                                                                                                                      |
| onUpdateCallback     | function           | {}                                    |
| onChangeCallback     | function           | {}                                    | Callback function to be defined to receive selection changed events                                                                                                                                                                                                                                                                                                                          |
| onSlideStartCallback | function           | {}                                    | Callback function to be defined to receive slider handle end events                                                                                                                                                                                                                                                                                                                          |
| onSlideEndCallback   | function           | {}                                    | Callback function to be defined to receive slider handle end events                                                                                                                                                                                                                                                                                                                          |
| showNow              | bool               | {}                                    | Set this variable to true if you want to show a line on the timeline that represents the current time                                                                                                                                                                                                                                                                                        |
| showTooltips         | bool               | {}                                    | Set this to true if you want to enable tooltips for the current time                                                                                                                                                                                                                                                                                                                         |
| successColor         | string             | rgb(98, 203, 102)                     | String for success interval or value color                                                                                                                                                                                                                                                                                                                                                   |
| disabledColor        | string             | rgb(214, 0, 11)                       | String for disabled interval or value color                                                                                                                                                                                                                                                                                                                                                  |
| height               | string             | 3em                                   | String for height of slider                                                                                                                                                                                                                                                                                                                                                                  |
| handleHeight         | string             | 24px                                  | String for height of slider handle                                                                                                                                                                                                                                                                                                                                                           |

### Example

[Live demo](https://codesandbox.io/s/react-timeline-range-slider-ve7w2?file=/src/App.js)

```javascript
import React from 'react'
import { endOfToday, set } from 'date-fns'
import TimeRange from 'react-timeline-range-slider'

const now = new Date()
const getTodayAtSpecificHour = (hour = 12) => set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(14)

const startTime = getTodayAtSpecificHour(7)
const endTime = endOfToday()

const disabledIntervals = [
  { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
  { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
  { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) },
]

class App extends React.Component {
  state = {
    error: false,
    selectedInterval: [selectedStart, selectedEnd],
  }

  errorHandler = ({ error }) => this.setState({ error })

  onChangeCallback = (selectedInterval) => this.setState({ selectedInterval })

  render() {
    const { selectedInterval, error } = this.state
    return (
      <TimeRange
        error={error}
        ticksNumber={36}
        selectedInterval={selectedInterval}
        timelineInterval={[startTime, endTime]}
        onUpdateCallback={this.errorHandler}
        onChangeCallback={this.onChangeCallback}
        disabledIntervals={disabledIntervals}
      />
    )
  }
}

export default App
```
