import Svg, { Circle, Path } from "react-native-svg";
import { IconProps } from "./icons.type";

export function InfoIcon({
  fill = "#000",
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <Svg
      width={props.width || size}
      height={props.height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      className="feather feather-info"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 16v-4M12 8h.01" />
    </Svg>
  );
}
