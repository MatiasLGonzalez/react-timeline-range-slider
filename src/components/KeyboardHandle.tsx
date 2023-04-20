import React from 'react';

interface KeyboardHandleProps {
  domain: [number, number];
  handle: {
    id: string;
    value: number;
    percent: number;
  };
  getHandleProps: (id: string) => any;
  disabled?: boolean;
}

const KeyboardHandle: React.FC<KeyboardHandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
}) => (
  <button
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    className="react_time_range__keyboard_handle"
    style={{
      left: `${percent}%`,
      backgroundColor: disabled ? '#666' : '#ffc400',
    }}
    {...getHandleProps(id)}
  />
);

KeyboardHandle.defaultProps = { disabled: false };

export default KeyboardHandle;