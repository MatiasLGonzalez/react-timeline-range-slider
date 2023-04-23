import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import TimeRange from '../src/components/App'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<TimeRange />)
  })
})
