export const AVAILABLE_LANGUAGES: Array<string> = ['en', 'ua'];

export const MenuItem = {
  WOMEN: 'Women',
  MEN: 'Men',
  KIDS: 'Kids',
} as const;

export enum PageNumbers {
  FIRST_PAGE = 1,
  SECOND_PAGE = 2,
  THIRD_PAGE = 3,
  FOURTH_PAGE = 4,
  FIFTH_PAGE = 5,
  SIXTH_PAGE = 6,
  SEVENTH_PAGE = 7,
  EIGHTTH_PAGE = 8,
  NINETH_PAGE = 9,
  TENTH_PAGE = 10,
  ELEVENTH_PAGE = 11,
  TWELFTH_PAGE = 12,
  THIRTEENTH_PAGE = 13,
  FOURTEENTH_PAGE = 14,
  FIFTEENTH_PAGE = 15,
  SIXTEENTH_PAGE = 16,
  SEVENTEENTH_PAGE = 17,
  EIGHTEENTH_PAGE = 18,
  NINETEENTH_PAGE = 19,
  TWENTIETH_PAGE = 20,
  ELLIPSIS = '...',
}

export const ELLIPSIS = 'ellipsis';

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
  TABLET = 960,
}
