import React from 'react';
import { css } from '@emotion/react';

interface SliderRailProps {
  getRailProps: () => any;
}

const railOuterStyles = css`
  position: absolute;
  width: 100%;
  height: 50px;
  transform: translate(0%, -50%);
  cursor: pointer;
`;

const railInnerStyles = css`
  position: absolute;
  width: 100%;
  height: 50px;
  transform: translate(0%, -50%);
  pointer-events: none;
  background-color: #F5F7FA;
  border-bottom: 1px solid #C8CACC;
`;

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => (
  <>
    <div css={railOuterStyles} {...getRailProps()} />
    <div css={railInnerStyles} />
  </>
);

export default SliderRail;
