import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { Navigation, Virtual } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import ArrowSwiperCard from 'assets/svgs/ArrowSwiperCard';
import { getValidClassNames } from 'helpers';
import styles from './index.module.scss';

export interface ProductsGridShortMobileProps {
  children: ReactNode;
}

const ProductsGridShortMobile: FC<ProductsGridShortMobileProps> = ({
  children,
}) => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const combinedClassName = getValidClassNames(styles.arrow, styles.arrowPrev);

  const setSwiperIndex = useCallback(
    ({ activeIndex }: { activeIndex: number }) => {
      setActiveIndex(activeIndex);
    },
    [setActiveIndex],
  );

  const arrowClassName = useMemo(
    () => (arrowPrev?: boolean) => {
      if (arrowPrev) {
        return activeIndex ? styles.itemArrow : styles.invisible;
      }
      return activeIndex ? styles.invisible : styles.itemArrow;
    },
    [activeIndex],
  );

  return (
    <Swiper
      modules={[Navigation, Virtual]}
      navigation={{ prevEl, nextEl }}
      spaceBetween={10}
      slidesPerView={2}
      virtual
      onRealIndexChange={setSwiperIndex}
    >
      {children}
      <div className={styles.wrapperArrows}>
        <button ref={node => setPrevEl(node)} className={arrowClassName(true)}>
          <ArrowSwiperCard className={combinedClassName} />
        </button>
        <button ref={node => setNextEl(node)} className={arrowClassName()}>
          <ArrowSwiperCard className={styles.arrow} />
        </button>
      </div>
    </Swiper>
  );
};

export default ProductsGridShortMobile;
