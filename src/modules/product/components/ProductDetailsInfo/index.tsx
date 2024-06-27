import React, { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddToCartButton from 'modules/checkout/components/AddToCartButton';
import Accordion from 'modules/core/components/Accordion';
import { Size, Color } from 'types/types';
import { useGetViewportWidth } from 'hooks';
import { ViewportWidth } from 'utils/constants';
import ProductInformationMobile from '../ProductInformationMobile';
import styles from './index.module.scss';
import ProductInformation from '../ProductInformation';

export interface ProductDetailsInfoProps {
  title?: string;
  price?: string;
  sizes: Size[];
  description?: string;
  composition?: string;
  vendorCode?: number;
  addToFavorite: () => void;
  addToShoppingCart: () => void;
}

const ProductDetailsInfo: FC<ProductDetailsInfoProps> = ({
  title,
  price,
  sizes,
  description,
  composition,
  vendorCode,
  addToFavorite,
  addToShoppingCart,
}): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [selectedColor, setSelectedColor] = useState<Color>(Color.Black);
  const [isError, setIsError] = useState(true);

  const { t } = useTranslation();
  const isMobile = useGetViewportWidth(ViewportWidth.TABLET);

  const handleChangeSize = useCallback((size: Size) => {
    setSelectedSize(size);
    setIsError(false);
  }, []);

  const handleChangeColor = useCallback((color: Color) => {
    setSelectedColor(color);
  }, []);

  const productDescription = useMemo(
    () => [
      {
        title: t('productDetails.description'),
        titleStyles: styles.submenu,
        listStyle: styles.listStyle,
        list: description,
      },
      {
        title: t('productDetails.composition'),
        titleStyles: styles.submenu,
        list: composition,
      },
    ],
    [],
  );

  const addToCartButton = (
    <AddToCartButton
      addToBag={addToShoppingCart}
      addToFavorite={addToFavorite}
      isError={isError}
    />
  );

  const productInformationProps = {
    title,
    price,
    addToCartButton,
    vendorCode,
    selectedColor,
    sizes,
    selectedSize,
    handleChangeSize,
    handleChangeColor,
  };

  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <ProductInformationMobile {...productInformationProps} />
      ) : (
        <ProductInformation {...productInformationProps} />
      )}
      {productDescription.map(props => (
        <div className={styles.accordionBox} key={props.title}>
          <Accordion {...props} />
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsInfo;
