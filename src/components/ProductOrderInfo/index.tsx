import React, { FC, useState } from 'react';
import SizeSelector from 'components/SizeSelector';
import ColorSelection from 'components/ColorSelection';
import AddToBagButton from 'components/AddToBagButton';
import Accordion from 'components/Accordion';
import { Size, Color } from 'types';
import black from '../../assets/images/chooseColor/black.png';
import white from '../../assets/images/chooseColor/white.png';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

export interface ItemPageProps {
  id: string;
  title: string;
  price: number;
  size: Size[];
  description: string;
  composition: string;
}

const ProductOrderInfo: FC<ItemPageProps> = ({
  title,
  price,
  size,
  description,
  composition,
  id,
}) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color>(Color.Black);
  const [isError, setIsError] = useState(true);

  const { t } = useTranslation();

  const colors = [
    {
      label: Color.Black,
      content: black,
    },
    {
      label: Color.White,
      content: white,
    },
  ];

  const defaultSizes: Size[] = [Size.XS, Size.S, Size.M, Size.L, Size.XL];

  const handleChangeSize = (parameter: string, size: string) => {
    setSelectedSize(size as Size);
    setIsError(false);
  };

  const handleChangeColor = (color: Color) => {
    setSelectedColor(color);
  };

  const addToBag = () => {
    // TODO: add the function of adding an item to the shopping bag
    console.log(id);
    console.log(selectedColor);
    console.log(selectedSize);
  };

  const addToFavorite = () => {
    // TODO: add the function of adding an item to the favorite
    console.log(id);
    console.log(selectedColor);
    selectedSize && console.log(selectedSize);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <p className={styles.ref}>Ref. {id}</p>
      <p className={styles.price}>
        {price} <span className={styles.currency}>€</span>
      </p>
      <div className={styles.colorBox}>
        <p className={styles.submenu}>{t('productOrder.selectColour')}</p>
        <ColorSelection
          colors={colors}
          chosenColor={selectedColor}
          changeColor={handleChangeColor}
          colorStyles={styles.color}
          chosenColorStyles={styles.chosenColor}
        />
      </div>
      <p className={styles.submenu}>{t('productOrder.selectSize')}</p>
      <div className={styles.sizeBox}>
        <SizeSelector
          parameters={defaultSizes}
          sizes={size}
          active={selectedSize}
          handleClick={handleChangeSize}
          activeStyles={styles.activeSize}
          buttonStyles={styles.sizeButton}
        />
      </div>
      <AddToBagButton
        addToBag={addToBag}
        addToFavorite={addToFavorite}
        isError={isError}
      />
      <div className={styles.accordionBox}>
        <Accordion
          title="Description"
          titleStyles={styles.submenu}
          listStyle={styles.listStyle}
          list={<p className={styles.text}>{description}</p>}
        />
      </div>
      <div className={styles.accordionBox}>
        <Accordion
          title="Composition"
          titleStyles={styles.submenu}
          list={<p className={styles.text}>{composition}</p>}
        />
      </div>
    </div>
  );
};

export default ProductOrderInfo;
