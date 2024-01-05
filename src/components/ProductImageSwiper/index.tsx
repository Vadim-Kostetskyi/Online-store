import React, { FC, useCallback, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import CoreSwiper from 'components/CoreSwiper';
import ArrowSwiperCard from 'assets/svgs/ArrowSwiperCard';
import { ImageItemProps } from 'redux/types';
import { getValidClassNames } from 'libs/helpers/helpers';

import styles from './index.module.scss';
export interface ProductImageSwiperProps {
  images: ImageItemProps[];
}

const ProductImageSwiper: FC<ProductImageSwiperProps> = ({ images }) => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [isHidden, setIsHidden] = useState(true);

  const handleFocus = useCallback(() => setIsHidden(false), []);
  const handleBlur = useCallback(() => setIsHidden(true), []);

  const imagesSlides = useCallback(() => {
    return images.map(({ id, name, url }) => (
      <SwiperSlide key={id}>
        <img src={url} alt={name} className={styles.img} />
      </SwiperSlide>
    ));
  }, [images]);

  return (
    <div
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={styles.productImageSwiper}
    >
      <CoreSwiper navigation={{ prevEl, nextEl }}>
        {imagesSlides()}
        <div className={isHidden ? styles.hide : styles.wrapperArrows}>
          <button ref={node => setPrevEl(node)} className={styles.itemArrow}>
            <ArrowSwiperCard
              className={getValidClassNames(styles.arrow, styles.arrowPrev)}
            />
          </button>
          <button ref={node => setNextEl(node)} className={styles.itemArrow}>
            <ArrowSwiperCard className={styles.arrow} />
          </button>
        </div>
      </CoreSwiper>
    </div>
  );
};

export default ProductImageSwiper;
