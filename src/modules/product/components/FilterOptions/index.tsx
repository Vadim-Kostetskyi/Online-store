import React, {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from 'modules/core/components/Accordion';
import PriceSelector from '../PriceSelector';
import FilterTabButtons from '../FilterTabButtons';
import ColorSelection from '../ColorSelection';
import { Color, Size } from 'types/types';
import SizeSelector from '../SizeSelector';
import { BodyFilterProducts } from 'redux/types';
import { FilterItems } from 'types/types';
import styles from './index.module.scss';

interface FilterOptionsProps {
  setSize: Dispatch<SetStateAction<Size[]>>;
  setColor: Dispatch<SetStateAction<Color[]>>;
  setTab: Dispatch<SetStateAction<string>>;
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  sortProducts: (body: BodyFilterProducts, sortBy: string) => void;
  handleSetNewProducts: () => void;
  isResetting: boolean;
}

const FilterOptions: FC<FilterOptionsProps> = ({
  setSize,
  setColor,
  setTab,
  setPriceRange,
  sortProducts,
  handleSetNewProducts,
  isResetting,
}) => {
  const [selectedSize, setSelectedSize] = useState<Size[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color[]>([]);

  useEffect(() => {
    if (isResetting) {
      setSelectedColor([]);
      setSelectedSize([]);
    }
  }, [isResetting]);

  const { t } = useTranslation();

  const handleClickTabButtons = useCallback((name: string) => {
    const body = {
      colours: [Color.Black.toUpperCase(), Color.Beige.toUpperCase()],
      sizes: [Size.L, Size.M, Size.S, Size.XL, Size.XS],
      priceRange: {
        min: 0,
        max: 10000,
      },
    };

    switch (name) {
      case FilterItems.NewNow:
        handleSetNewProducts();
        break;
      case FilterItems.PriceLowToHigh:
        sortProducts(body, FilterItems.PriceLowToHighRequest);
        setTab(FilterItems.PriceLowToHighRequest);
        break;
      case FilterItems.PriceHighToLow:
        sortProducts(body, FilterItems.PriceHighToLowRequest);
        setTab(FilterItems.PriceHighToLowRequest);
        break;
      default:
        break;
    }
  }, []);

  const handleClick = useCallback((value: Color | Size) => {
    const setParameter = <T extends Size | Color>(
      set: (colors: T[] | ((prev: T[]) => T[])) => void,
      value: T,
    ) => {
      set((val: T[]) =>
        val?.includes(value)
          ? val.filter(item => item !== value)
          : [...val, value],
      );
    };

    if (value in Color) {
      setParameter(setSelectedColor, value as Color);
      setParameter(setColor, value as Color);
    } else if (value in Size) {
      setParameter(setSelectedSize, value as Size);
      setParameter(setSize, value as Size);
    }
  }, []);

  const handleChangePrice = useCallback((min: number, max: number) => {
    if (isResetting) {
      setPriceRange(() => [0, 1000]);
    }
    setPriceRange(() => [min, max]);
  }, []);

  const sortBy = useMemo(
    () => ({
      title: t('sortBy'),
      list: (
        <FilterTabButtons
          handleClickFiler={handleClickTabButtons}
          filter={true}
        />
      ),
    }),
    [],
  );

  const items = useMemo(
    () => [
      {
        title: t('color'),
        list: (
          <ColorSelection
            changeColor={handleClick}
            chosenColor={selectedColor}
            multiChoice={true}
          />
        ),
      },
      {
        title: t('size'),
        list: (
          <SizeSelector
            handleClick={handleClick}
            active={selectedSize}
            isFilter={true}
          />
        ),
      },
      {
        title: t('price'),
        list: (
          <PriceSelector
            onChange={handleChangePrice}
            min={0}
            max={1000}
            shouldReset={isResetting}
          />
        ),
      },
    ],
    [selectedColor, selectedSize],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperSort}>
        <Accordion
          title={sortBy.title}
          list={sortBy.list}
          titleStyles={styles.title}
          listStyle={styles.sortList}
        />
      </div>
      {items.map(({ title, list }) => (
        <div className={styles.wrapperList} key={title}>
          <Accordion
            title={title}
            list={list}
            listStyle={styles.list}
            titleStyles={styles.title}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterOptions;
