import React from 'react';
import styled from '@emotion/styled';

type TrackProps = {
  source: {
    id: string;
    value: number;
    percent: number;
  };
  target: {
    id: string;
    value: number;
    percent: number;
  };
  getTrackProps: () => any;
  disabled?: boolean;
  error: boolean;
};

type StyledTrackProps = {
  error: boolean;
  disabled: boolean;
  sourcePercent: number;
  targetPercent: number;
};

const StyledTrack = styled.div<StyledTrackProps>`
  position: absolute;
  transform: translate(0%, -50%);
  height: 50px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease;
  z-index: ${({ disabled }) => (disabled ? 1 : 3)};

  left: ${({ sourcePercent }) => `${sourcePercent}%`};
  width: ${({ sourcePercent, targetPercent }) =>
    `calc(${targetPercent - sourcePercent}% - 1px)`};

  ${({ disabled, error }) =>
    disabled
      ? ''
      : error
      ? `
    background-color: rgba(214,0,11,0.5);
    border-left: 1px solid rgba(214,0,11,0.5);
    border-right: 1px solid rgba(214,0,11,0.5);
  `
      : `
    background-color: rgba(98, 203, 102, 0.5);
    border-left: 1px solid #62CB66;
    border-right: 1px solid #62CB66;
  `}
`;

const Track: React.FC<TrackProps> = ({
  error,
  source,
  target,
  getTrackProps,
  disabled = false,
}) => (
  <StyledTrack
    error={error}
    disabled={disabled}
    sourcePercent={source.percent}
    targetPercent={target.percent}
    {...getTrackProps()}
  />
);

export default Track;
