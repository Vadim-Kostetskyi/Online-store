import { MenuItem } from 'components/Footer/MenuList';

export type MenuContent = {
  [key: string]: MenuItem[];
};

export const menuName: MenuItem[] = [
  { id: 0, href: '#', label: 'Women' },
  { id: 1, href: '/main-page/men', label: 'Men' },
  { id: 2, href: '#', label: 'Kids' },
];

export const category: MenuContent = {
  Women: [],
  Men: [
    { id: 0, href: '#', label: 'New now' },
    { id: 1, href: '#', label: 'Clothing' },
    { id: 2, href: '#', label: 'Suits' },
    { id: 3, href: '#', label: 'Shoes and accessories' },
    { id: 4, href: '#', label: 'Promotion' },
    { id: 5, href: '#', label: 'Collections' },
  ],
  Kids: [],
};

export const subcategory: MenuContent = {
  Women: [],
  Men: [
    { id: 0, href: '#', label: 'See all' },
    { id: 1, href: '#', label: 'Coats' },
    { id: 2, href: '#', label: 'Cardigans and sweaters' },
    { id: 3, href: '#', label: 'Jackets and overshirts' },

    { id: 4, href: '#', label: 'Trousers' },
    { id: 5, href: '#', label: 'Shirts' },
    { id: 6, href: '#', label: 'Jeans' },
  ],
  Kids: [],
};
