import { TFunction } from 'i18next';
import { Category, Subcategory, FilterItems } from 'types/types';

export type ButtonProps = {
  name: string;
  value: Category | Subcategory | FilterItems;
};

export const getButtons = (t: TFunction<string, string>): ButtonProps[] => [
  {
    name: t('categoryItems.all'),
    value: Category.CLOTHING,
  },
  {
    name: t('categoryItems.jackets'),
    value: Subcategory.JACKETS,
  },
  {
    name: t('categoryItems.fieldJackets'),
    value: Subcategory.CARDIGANS,
  },
  {
    name: t('categoryItems.overshirts'),
    value: Subcategory.OVERSHIRTS,
  },
  {
    name: t('categoryItems.quiltedCoats'),
    value: Subcategory.QUILTED,
  },
];

export const getFilterButtons = (
  t: TFunction<string, string>,
): ButtonProps[] => [
  {
    name: t('newNow'),
    value: FilterItems.NewNow,
  },
  {
    name: t('productFilter.PriceLowToHigh'),
    value: FilterItems.PriceLowToHigh,
  },
  {
    name: t('productFilter.priceHighToLow'),
    value: FilterItems.PriceHighToLow,
  },
];
