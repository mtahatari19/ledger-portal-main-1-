import { svgIconNames } from './shared-ui-icon.constants';

export type SvgIconType = 'fill' | 'stroke';

export interface SvgIcon {
  name: (typeof svgIconNames)[number];
  type: SvgIconType;
}
