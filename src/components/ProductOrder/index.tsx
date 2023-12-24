import React from 'react';
import { useParams } from 'react-router-dom';
import PhotoSwitcher from 'components/PhotoSwitcher';
import ProductOrderInfo from 'components/ProductOrderInfo';
import { useGetProductByIdQuery } from 'redux/productsApi';
import SameStyleProducts from 'components/SameStyleProducts';
import styles from './index.module.scss';

const ProductOrder = () => {
  const { productId } = useParams();
  const { data } = useGetProductByIdQuery({ id: productId });

  const visitedProduct = localStorage.getItem('visited');
  const visitedProductArray = visitedProduct ? JSON.parse(visitedProduct) : [];
  const newProduct = data?.id;

  if (newProduct && !visitedProductArray.includes(newProduct)) {
    visitedProductArray.unshift(newProduct);
  }
  localStorage.setItem('visited', JSON.stringify(visitedProductArray));

  return (
    <>
      <div className={styles.wrapper}>
        <PhotoSwitcher {...data} />
        <ProductOrderInfo {...data} />
      </div>
      <SameStyleProducts subcategory={data?.subcategory} />
    </>
  );
};

export default ProductOrder;
