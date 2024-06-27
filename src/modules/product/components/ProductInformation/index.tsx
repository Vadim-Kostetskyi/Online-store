import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ColorSelection from '../ColorSelection';
import SizeSelector from '../SizeSelector';
import ProductPrice from '../ProductPrice';
import { Size, Color, clothesColors } from 'types/types';
import styles from './index.module.scss';

interface ProductInformationProps {
  title?: string;
  price?: string;
  vendorCode?: number;
  addToCartButton: JSX.Element;
  selectedColor: Color;
  sizes: Size[];
  selectedSize?: Size | undefined;
  handleChangeSize: (size: Size) => void;
  handleChangeColor: (color: Color) => void;
}

const ProductInformation: FC<ProductInformationProps> = ({
  title,
  price,
  addToCartButton,
  vendorCode,
  selectedColor,
  sizes,
  selectedSize,
  handleChangeSize,
  handleChangeColor,
}) => {
  const { t } = useTranslation();

  const defaultSizes: Size[] = Object.values(Size);

  return (
    <>
      <p className={styles.title}>{title}</p>
      <p className={styles.ref}>
        {t('productDetails.ref')}. {vendorCode}
      </p>
      {price ? (
        <ProductPrice price={parseFloat(price)} className={styles.price} />
      ) : null}
      <div className={styles.colorBox}>
        <p className={styles.submenu}>{t('productDetails.selectColour')}</p>
        <ColorSelection
          colors={clothesColors}
          chosenColor={selectedColor}
          changeColor={handleChangeColor}
        />
      </div>
      <p className={styles.submenu}>{t('productDetails.selectSize')}</p>
      <div className={styles.sizeBox}>
        <SizeSelector
          parameters={defaultSizes}
          sizes={sizes}
          active={selectedSize}
          handleClick={handleChangeSize}
          isProductDetails={true}
        />
      </div>
      {addToCartButton}
    </>
  );
};

export default ProductInformation;
