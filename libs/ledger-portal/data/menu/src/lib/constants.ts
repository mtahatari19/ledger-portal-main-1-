import { MenuGroup, MenuItem } from './models';
import { getMenuItemById } from './utils';

export function createMenuItems<
  TMenuItems extends MenuItem<TMenuItems[number] extends infer X ? (X extends MenuItem ? X['id'] : string) : string>[],
>(menu: TMenuItems) {
  return menu;
}

export const menuItems = createMenuItems([
  {
    id: 'account-type',
    title: $localize`نوع حساب`,
    icon: { name: 'document', type: 'stroke' },
    route: '/console/account-type',
    permissions: ['Default Resource'],
  },
  {
    id: 'product',
    title: $localize`محصول`,
    icon: { name: 'document', type: 'stroke' },
    route: '/console/product/list',
    permissions: ['Default Resource'],
  },
  {
    id: 'product-type',
    title: $localize`نوع محصول`,
    icon: { name: 'document', type: 'stroke' },
    route: '/console/basic-information/product-type',
    permissions: ['Default Resource'],
  },
  {
    id: 'accounting-relation-type',
    title: $localize`نوع رابطه حسابداری`,
    icon: { name: 'document', type: 'stroke' },
    route: '/console/accounting-relation-type/list',
    permissions: ['Default Resource'],
  },
  {
    id: 'currency',
    title: $localize`ارز`,
    icon: { name: 'coins', type: 'stroke' },
    route: '/console/currency/list',
    permissions: ['Default Resource'],
  },
  {
    id: 'currency-type',
    title: $localize`نوع ارز`,
    icon: { name: 'coins', type: 'stroke' },
    route: '/console/currency-type/list',
    permissions: ['Default Resource'],
  },
  {
    id: 'account-group',
    title: $localize`گروه حساب`,
    icon: { name: 'document', type: 'stroke' },
    route: '/console/account-group/list',
    permissions: ['Default Resource'],
  },
]);

export const menuGroups: MenuGroup[] = [
  {
    id: 'basic-information',
    title: $localize`اطلاعات پایه`,
    icon: { name: 'document-fill', type: 'fill' },
    items: [
      getMenuItemById('account-type'),
      getMenuItemById('account-group'),
      getMenuItemById('accounting-relation-type'),
      getMenuItemById('product'),
      getMenuItemById('product-type'),
      getMenuItemById('currency'),
      getMenuItemById('currency-type'),
    ],
  },
];
