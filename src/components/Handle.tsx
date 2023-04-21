import React from 'react';

interface HandleProps {
  error: boolean;
  domain: number[];
  handle: {
    id: string;
    value: number;
    percent: number;
  };
  getHandleProps: (id: string) => any;
  disabled?: boolean;
}

const handleStyles = {
  wrapper: {
    position: 'absolute' as 'absolute',
    zIndex: 2,
    width: 20,
    height: 20,
    cursor: 'pointer',
    borderRadius: '50%',
    backgroundColor: 'white',
  },
  container: (disabled: boolean) => ({
    position: 'absolute' as 'absolute',
    zIndex: 3,
    width: 20,
    height: 20,
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '1px solid #ccc',
  }),
  marker: (error: boolean) => ({
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: error ? 'red' : 'blue',
  }),
};

const Handle: React.FC<HandleProps> = ({
  error,
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
}) => {
  const leftPosition = `${percent}%`;

  return (
    <>
      <div
        style={{ ...handleStyles.wrapper, left: leftPosition }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{ ...handleStyles.container(disabled ?? false), left: leftPosition }}
      >
        <div
          style={handleStyles.marker(error)}
        />
      </div>
    </>
  );
};

export default Handle;
