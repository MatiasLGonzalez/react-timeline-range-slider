import React from 'react'

interface HandleProps {
  error: boolean
  domain: number[]
  handle: {
    id: string
    value: number
    percent: number
  }
  getHandleProps: (id: string) => any
  disabled?: boolean
}

const handleStyles = {
  wrapper: {
    position: 'absolute' as const,
    transform: 'translate(-50%, -50%)',
    WebkitTapHighlightColor: '#000000',
    zIndex: 6,
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  container: (disabled: boolean) => ({
    position: 'absolute' as const,
    display: 'flex',
    transform: 'translate(-50%, -50%)',
    zIndex: 4,
    width: '10px',
    height: '24px',
    borderRadius: '4px',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.4)',
    backgroundColor: disabled ? '#666' : '#FFFFFF',
  }),
  marker: (error: boolean) => ({
    width: '2px',
    height: '12px',
    margin: 'auto',
    borderRadius: '2px',
    backgroundColor: error ? 'rgb(214, 0, 11)' : 'rgb(98, 203, 102)',
    transition: 'background-color 0.2s ease',
  }),
}

const Handle: React.FC<HandleProps> = ({
  error,
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
}) => {
  const leftPosition = `${percent}%`

  return (
    <>
      <div style={{ ...handleStyles.wrapper, left: leftPosition }} {...getHandleProps(id)} />
      <div
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{ ...handleStyles.container(disabled ?? false), left: leftPosition }}
      >
        <div style={handleStyles.marker(error)} />
      </div>
    </>
  )
}

export default Handle
