export type StyledTrackProps = {
  error: boolean
  disabled: boolean
  sourcePercent: number
  targetPercent: number
}

export type Interval = {
  id: string
  start: Date
  end: Date
}

export type UpdateCallbackData = {
  error: boolean
  time: Date[]
}
