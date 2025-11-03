import { MenuItem } from './models';
import { menuItems } from './constants';

export function getMenuItemById(id: (typeof menuItems)[number]['id']): MenuItem {
  const item = menuItems.find(item => item.id === id);
  if (!item) {
    throw new Error(`Menu ID ${id} not found!`);
  }
  return item;
}



