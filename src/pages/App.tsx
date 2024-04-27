import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import CategoryPage from 'pages/CategoryPage';
import ProductsGridPage from 'pages/ProductsGridPage';
import ProductDetailsPage from 'pages/ProductDetailsPage';
import OrderCheckoutPage from './OrderCheckoutPage';
import OrderCheckoutAuthorization from 'modules/checkout/containers/OrderCheckoutAuthorization';
import Delivery from 'modules/order/conteiners/Delivery';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/men" element={<CategoryPage />} />
      <Route path="/men/products-grid" element={<ProductsGridPage />} />
      <Route path="/product/:productId" element={<ProductDetailsPage />} />
      <Route path="/checkout" element={<OrderCheckoutPage />}>
        <Route path="details" element={<OrderCheckoutAuthorization />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="payment" />
      </Route>
    </Routes>
  );
}

export default App;
