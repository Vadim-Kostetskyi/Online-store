import { Size } from 'types';

export interface GetProductsPayload {
  page: number;
  size: number;
}

export interface ProductProps {
  id: string;
  title: string;
  price: string;
  size: Size[];
  category: string;
  subcategory: string;
  colour: string;
  description: string;
  composition: string;
  brand: string;
  collection: string;
  manufacturer: string;
  files: string[];
}

export interface ImageItemProps {
  id: string;
  name: string;
  url: string;
}

export interface ImageProps {
  id: string;
  images: ImageItemProps[];
}

export interface GetProductsResponse {
  data: ProductProps[];
}

export interface GetProductsWithImagesProps {
  products: ProductProps[];
  images: ImageProps[];
  error?: boolean;
}
export interface GetProductsWithImagesDTO {
  product: ProductProps;
  images: ImageItemProps[];
}

export interface SearchProductsProps {
  page: number;
  size: number;
  body: BodySearchProducts;
}

export type BodySearchProducts =
  | {
      category: string;
    }
  | {
      subcategory: Subcategory;
    };

export enum Subcategory {
  JACKETS = 'JACKETS',
  COATS = 'COATS',
  TRENCH = 'TRENCH',
  GILETS = 'GILETS',
  OVERSHIRTS = 'OVERSHIRTS',
  SWEATERS = 'SWEATERS',
  CARDIGANS = 'CARDIGANS',
  QUILTED = 'QUILTED',
}
