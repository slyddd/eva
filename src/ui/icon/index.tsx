import Svg from 'react-native-svg';
import { IconProps } from './icons.type';
import { KeyIcon } from './icons/key';
import { InfoIcon } from './icons/info';
import { LeftIcon } from './icons/chevron-left';
import { MailIcon } from './icons/mail';
import { EyeIcon } from './icons/eye';
import { EyeOffIcon } from './icons/eye-off';
import { RightIcon } from './icons/chevron-right';
import { CheckIcon } from './icons/check';
import { XIcon } from './icons/x';
import { RefreshCWIcon } from './icons/refresh-cw';
import { FemaleIcon } from './icons/female';
import { MaleIcon } from './icons/male';
import { ChartIcon } from './icons/bar-chart';
import { HomeIcon } from './icons/home';
import { SettingsIcon } from './icons/settings';

function IconBase({
  fill = '#000',
  size = 24,
  strokeWidth = 2,
  children,
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
      {...props}
    >
      {children}
    </Svg>
  );
}

function createIcon(Component: React.ComponentType) {
  return (props: IconProps) => (
    <IconBase {...props}>
      <Component />
    </IconBase>
  );
}

export const Icon = {
  Key: createIcon(KeyIcon),
  Info: createIcon(InfoIcon),
  Left: createIcon(LeftIcon),
  Right: createIcon(RightIcon),
  Mail: createIcon(MailIcon),
  Eye: createIcon(EyeIcon),
  EyeOff: createIcon(EyeOffIcon),
  Success: createIcon(CheckIcon),
  Error: createIcon(XIcon),
  Refresh: createIcon(RefreshCWIcon),
  Female: createIcon(FemaleIcon),
  Male: createIcon(MaleIcon),
  Stats: createIcon(ChartIcon),
  Home: createIcon(HomeIcon),
  Settings: createIcon(SettingsIcon),
};
