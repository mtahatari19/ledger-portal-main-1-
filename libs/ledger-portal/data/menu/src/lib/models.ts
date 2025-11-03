import { SvgIcon } from '@ledger-portal/back-office/shared/ui/icon';

export interface MenuItem<K = string> {
  id: K;
  title: string;
  icon?: SvgIcon;
  route: string;
  permissions: string[];
}

export interface MenuGroup {
  id: string;
  title: string;
  icon: SvgIcon;
  items: MenuItem[];
}

export interface OtherMenuGroup {
  id: string;
  title: string;
  icon: SvgIcon;
  items: MenuItem[];
  route: string;
  permissions: string[];
}

export interface SearchLogItem {
  tag: string;
  count: number;
}
export interface ForeignRegisterGroup {
  id: string;
  title: string;
  icon: SvgIcon;
  items: MenuItem[];
  route: string;
  permissions: string[];
}
