export const AVAILABLE_LANGUAGES: Array<string> = ['en', 'ua'];

export const MenuItem = {
  WOMEN: 'Women',
  MEN: 'Men',
  KIDS: 'Kids',
} as const;

export const FIRST_PAGE = 1;
export const DEFAULT_PAGES_AMOUNT = 4;
export const SIMILAR_PRODUCTS_SIZE = 3;
export const PRODUCT_GRID_SIZE = 9;
export const PRODUCT_GRID_SIZE_MOBILE = 12;

export enum TimeConstants {
  SECOND = 1000,
  MINUTE = 60 * SECOND,
  HOUR = 60 * MINUTE,
  DAY = 24 * HOUR,
  TWO_DAYS = 2 * DAY,
}

export enum CssProperties {
  CURSOR_POINTER = 'pointer',
  BORDER_COLOR = '#959595',
  HEIGHT = '50px',
}

export enum ViewportWidth {
  MOBILE = 480,
}
