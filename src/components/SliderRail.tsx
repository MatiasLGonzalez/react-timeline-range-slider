import React from 'react'

import { StyledInnerRailDiv, StyledOuterRailDiv } from './StyledComponents'

interface SliderRailProps {
  getRailProps: () => any
}

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => (
  <>
    <StyledOuterRailDiv {...getRailProps()} />
    <StyledInnerRailDiv />
  </>
)

export default SliderRail
