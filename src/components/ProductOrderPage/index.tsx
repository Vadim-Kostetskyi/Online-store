import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ProductOrder from 'components/ProductOrder';
import VisitedProducts from 'components/VisitedProducts';

const ProductOrderPage = () => {
  return (
    <>
      <Header />
      <ProductOrder />
      <VisitedProducts />
      <Footer />
    </>
  );
};

export default ProductOrderPage;
