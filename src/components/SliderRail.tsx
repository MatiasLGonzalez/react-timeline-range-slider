import React from 'react';

interface SliderRailProps {
  getRailProps: () => any;
}

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => (
  <>
    <div className="react_time_range__rail__outer" {...getRailProps()} />
    <div className="react_time_range__rail__inner" />
  </>
);

export default SliderRail;