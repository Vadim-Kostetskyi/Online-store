import React from 'react';
import CollectionImageSwiper from 'components/CollectionImageSwiper';
import Header from 'components/Header';
import FormSubscription from 'components/FormSubscription';
import NewNow from 'components/NewNow';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import Collection from 'components/Collection';
import ProductsCards from 'components/ProductsCards';
import { useGetProductsWithImagesQuery } from 'redux/productsApi';

const MainPage = () => {
  const { data } = useGetProductsWithImagesQuery({ page: 0, size: 9 });

  return (
    <>
      <Header />
      <CollectionImageSwiper />
      <NewNow />
      <Collection />
      <FormSubscription />
      {data && <ProductsCards searchProducts={data} />}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default MainPage;
