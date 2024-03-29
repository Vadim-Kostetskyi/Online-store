import { Category, Size, Subcategory } from 'types/types';

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
  subcategory: Subcategory;
  colour: string;
  description: string;
  composition: string;
  brand: string;
  collection: string;
  manufacturer: string;
  files: string[];
  quantity: number;
  vendorCode: number;
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
  products: ProductProps[];
  pages: number;
}

export interface GetProductsWithImagesProps {
  products: ProductProps[];
  images: ImageProps[];
  pages?: number;
  error?: boolean;
}

export interface GetProductsWithImages {
  product: ProductProps;
  images: ImageItemProps[];
}

export interface SearchProductsProps {
  page: number;
  size: number;
  body: BodySearchProducts;
}

export type BodySearchProducts = {
  category?: Category;
  subcategory?: Subcategory;
};

export interface TopCategoriesProductsProps {
  name: string;
  url: string;
}

export interface SearchByIdProps {
  id: string;
}

export interface GetProductsBiId {
  id: string[];
}
