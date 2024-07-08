import styled from '@emotion/styled'
import type { StyledRailProps, StyledTrackProps } from '../types'

export const TimeRangeContainer = styled.div`
  position: relative;
  padding: 5%;
  width: 100%;
  box-sizing: border-box;
  margin-top: 1em;
`

export const StyledTrack = styled.div<StyledTrackProps>`
  position: absolute;
  transform: translate(0%, -50%);
  height: ${({ height }) => height ?? '3em'};
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease;
  z-index: ${({ disabled }) => (disabled ? 1 : 3)};
  border-radius: 2.5px;
  left: ${({ sourcePercent }) => `${sourcePercent}%`};
  width: ${({ sourcePercent, targetPercent }) => `calc(${targetPercent - sourcePercent}%)`};

  ${({ disabled, error, disabledColor, successColor }) =>
    !disabledColor
      ? disabled
        ? `
    border: 1px solid #C8CACC;
    background: repeating-linear-gradient( -45deg, transparent, transparent 3px, #D0D3D7 4px, #D0D3D7 2px);
	  `
        : error
        ? `
    background-color: rgba(214,0,11,0.5);
    border: 1px solid rgba(214,0,11,0.5);
  `
        : `
    background-color: ${successColor}
    border: 1px solid #62CB66;
  `
      : disabled
      ? `
    border: 1px solid #C8CACC;
    background: repeating-linear-gradient( -45deg, ${disabledColor}, ${disabledColor} 3px, #D0D3D7 4px, #D0D3D7 2px);
	  `
      : error
      ? `
    background-color: rgba(214,0,11,0.5);
    border: 1px solid rgba(214,0,11,0.5);
  `
      : `
    background-color: ${successColor}
    border: 1px solid #62CB66;
  `}
`

/** Slider used for input */
export const StyledOuterRailDiv = styled.div<StyledRailProps>`
  position: absolute;
  width: 100%;
  height: ${({ height }) => height ?? '3em'};
  transform: translate(0%, -50%);
  cursor: pointer;
`

/** Slider used for drawing */
export const StyledInnerRailDiv = styled.div<StyledRailProps>`
  position: absolute;
  width: 100%;
  height: ${({ height }) => height ?? '3em'};
  border-radius: 2.5px;
  transform: translate(0%, -50%);
  pointer-events: none;
  background-color: #f5f7fa;
  border-bottom: 1px solid #c8cacc;
`

export const StyledHandleWrapper = styled.div<{ height?: string }>`
  position: absolute;
  transform: translate(-50%, -50%);
  -webkit-tap-highlight-color: #000000;
  z-index: 6;
  width: 24px;
  height: ${({ height }) => height ?? '24px'};
  cursor: pointer;
  background-color: transparent;
`

export const StyledHandleContainer = styled.div<{ disabled: boolean; height?: string }>`
  position: absolute;
  display: flex;
  transform: translate(-50%, -50%);
  z-index: 4;
  width: 10px;
  height: ${({ height }) => height ?? '24px'};
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  background-color: ${({ disabled }) => (disabled ? '#666' : '#FFFFFF')};
`

export const StyledHandleMarker = styled.div<{ error: boolean; disabledColor: string; successColor: string }>`
  width: 2px;
  height: 50%;
  margin: auto;
  border-radius: 2px;
  background-color: ${({ error, disabledColor, successColor }) => (error ? disabledColor : successColor)};
  transition: background-color 0.2s ease;
`

export const TickMarker = styled.div<{ isFullHour: boolean }>`
  position: absolute;
  margin-top: ${({ isFullHour }) => (isFullHour ? '1.5em' : '2em')};
  width: 1px;
  height: ${({ isFullHour }) => (isFullHour ? '1em' : '0.5em')};
  background-color: #c8cacc;
  z-index: 2;
`

export const TickLabel = styled.div`
  position: absolute;
  margin-top: 5em;
  font-size: 0.8em;
  text-align: center;
  z-index: 2;
  color: #77828c;
  font-family: sans-serif;
`
