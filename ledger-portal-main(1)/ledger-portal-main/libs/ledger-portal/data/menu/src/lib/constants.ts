import { MenuGroup, MenuItem } from './models';
import { getMenuItemById } from './utils';

export function createMenuItems<
  TMenuItems extends MenuItem<TMenuItems[number] extends infer X ? (X extends MenuItem ? X['id'] : string) : string>[],
>(menu: TMenuItems) {
  return menu;
}

export const menuItems = createMenuItems([
  {
    id: 'test-id',
    title: $localize`test`,
    icon: { name: 'link', type: 'stroke' },
    route: '/console',
    permissions: ['Default Resource'],
  },
]);

export const menuGroups: MenuGroup[] = [
  // {
  //   id: 'basic-information',
  //   title: $localize`تایتل محصول`,
  //   icon: { name: 'note', type: 'fill' },
  //   items: [
  //     getMenuItemById('test-id')
  //   ],
  // },
];
