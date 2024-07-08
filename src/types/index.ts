export type StyledTrackProps = {
  error: boolean
  disabled: boolean
  sourcePercent: number
  targetPercent: number
  color: string
  disabledColor: string
  successColor: string
  height?: string
}

export type StyledRailProps = {
  height?: string
}

export type DisabledInterval = {
  id: string
  start: Date
  end: Date
  color?: string
}

export type UpdateCallbackData = {
  error: boolean
  time: Date[]
}
