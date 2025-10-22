import { SvgIconType } from '@ledger-portal/shared/ui/icon';
import { svgIconNames } from './constants';

export interface SvgIcon {
  name: (typeof svgIconNames)[number];
  type: SvgIconType;
}
