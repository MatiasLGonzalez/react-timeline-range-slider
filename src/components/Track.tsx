import React from "react";

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

type GetTrackConfigProps = {
	error: boolean;
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
	disabled: boolean;
  };

const getTrackConfig = ({
  error,
  source,
  target,
  disabled,
}: GetTrackConfigProps): React.CSSProperties => {
  const basicStyle: React.CSSProperties = {
    left: `${source.percent}%`,
    width: `calc(${target.percent - source.percent}% - 1px)`,
  };

  if (disabled) return basicStyle;

  const coloredTrackStyle: React.CSSProperties = error
    ? {
        backgroundColor: "rgba(214,0,11,0.5)",
        borderLeft: "1px solid rgba(214,0,11,0.5)",
        borderRight: "1px solid rgba(214,0,11,0.5)",
      }
    : {
        backgroundColor: "rgba(98, 203, 102, 0.5)",
        borderLeft: "1px solid #62CB66",
        borderRight: "1px solid #62CB66",
      };

  return { ...basicStyle, ...coloredTrackStyle };
};

const Track: React.FC<TrackProps> = ({
  error,
  source,
  target,
  getTrackProps,
  disabled = false,
}) => (
  <div
    className={`react_time_range__track${disabled ? "__disabled" : ""}`}
    style={getTrackConfig({ error, source, target, disabled })}
    {...getTrackProps()}
  />
);

export default Track;
