import React from 'react'
import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

interface KeyboardHandleProps {
  domain: [number, number]
  handle: {
    id: string
    value: number
    percent: number
  }
  getHandleProps: (id: string) => any
  disabled?: boolean
}

interface StyledKeyboardHandleProps {
  left: string
  backgroundColor: string
  css?: SerializedStyles
}

const StyledKeyboardHandle = styled.button<StyledKeyboardHandleProps>`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  left: ${({ left }) => left};
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${({ css }) => css};
`

const KeyboardHandle: React.FC<KeyboardHandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
}) => (
  <StyledKeyboardHandle
    role='slider'
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    left={`${percent}%`}
    backgroundColor={disabled ? '#666' : '#ffc400'}
    css={null}
    {...getHandleProps(id)}
  />
)

KeyboardHandle.defaultProps = { disabled: false }

export default KeyboardHandle
