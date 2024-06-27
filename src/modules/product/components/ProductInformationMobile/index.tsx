import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ColorSelection from '../ColorSelection';
import SizeSelector from '../SizeSelector';
import PickerAccordion from '../PickerAccordion';
import ProductPrice from '../ProductPrice';
import { Size, Color, clothesColors } from 'types/types';
import styles from './index.module.scss';

interface ProductInformationMobileProps {
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

const ProductInformationMobile: FC<ProductInformationMobileProps> = ({
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

  const parameters = useMemo(
    () => [
      {
        title: t('productDetails.color'),
        list: (
          <div className={styles.colorSelectionBox}>
            <ColorSelection
              colors={clothesColors}
              chosenColor={selectedColor}
              changeColor={handleChangeColor}
            />
          </div>
        ),
      },
      {
        title: t('productDetails.size'),
        list: (
          <>
            <p className={styles.textSize}>Select size</p>
            <SizeSelector
              parameters={defaultSizes}
              sizes={sizes}
              active={selectedSize}
              handleClick={handleChangeSize}
              isProductDetails={true}
            />
          </>
        ),
      },
    ],
    [selectedColor, selectedSize],
  );

  return (
    <>
      <p className={styles.title}>
        {title}
        <span className={styles.currency}>
          {price ? (
            <ProductPrice price={parseFloat(price)} className={styles.price} />
          ) : null}
        </span>
      </p>
      <div className={styles.functionalBox}>
        {parameters.map((props, index) => (
          <PickerAccordion {...props} key={index} />
        ))}
        {addToCartButton}
      </div>
      <p className={styles.ref}>
        {t('productDetails.ref')}. {vendorCode}
      </p>
    </>
  );
};

export default ProductInformationMobile;
