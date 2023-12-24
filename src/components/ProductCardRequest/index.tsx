import React, { FC } from 'react';
import ProductCard from 'components/ProductCard';
import {
  useGetProductByIdQuery,
  useGetProductImagesQuery,
} from 'redux/productsApi';

interface ProductCardRequestProps {
  id: string;
}

const ProductCardRequest: FC<ProductCardRequestProps> = ({ id }) => {
  const { data } = useGetProductByIdQuery({ id: id });
  const images = useGetProductImagesQuery(data?.files);

  return <ProductCard {...data} files={images.data?.images} />;
};
export default ProductCardRequest;
