import { Size } from 'types';

export interface GetProductsPayload {
  page: number;
  size: number;
}

interface ProductProps {
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
  result: string;
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

export interface ProductImage {
  result: string;
}
