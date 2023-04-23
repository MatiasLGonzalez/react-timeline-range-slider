import React from 'react'
import { SerializedStyles, css } from '@emotion/react'
import styled from '@emotion/styled'

interface SliderRailProps {
  getRailProps: () => any
}

const railOuterStyles = css`
  position: absolute;
  width: 100%;
  height: 50px;
  transform: translate(0%, -50%);
  cursor: pointer;
`

const railInnerStyles = css`
  position: absolute;
  width: 100%;
  height: 50px;
  transform: translate(0%, -50%);
  pointer-events: none;
  background-color: #f5f7fa;
  border-bottom: 1px solid #c8cacc;
`

const StyledDiv = styled.div`
  ${(props: { css: SerializedStyles }) => props.css}
`

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => (
  <>
    <StyledDiv css={railOuterStyles} {...getRailProps()} />
    <StyledDiv css={railInnerStyles} />
  </>
)

export default SliderRail
