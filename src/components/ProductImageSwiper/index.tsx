import React, { FC, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import CoreSwiper from 'components/CoreSwiper';
import ArrowSwiperCard from 'assets/svgs/ArrowSwiperCard';
import styles from './index.module.scss';
import { ImageItemProps } from 'redux/types';

export interface ProductImageSwiperProps {
  images: ImageItemProps[];
}

const ProductImageSwiper: FC<ProductImageSwiperProps> = ({ images }) => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [isHidden, setIsHidden] = useState(true);

  const handleFocus = () => {
    setIsHidden(false);
  };

  const handleBlur = () => {
    setIsHidden(true);
  };

  return (
    <div
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={styles.productImageSwiper}
    >
      <CoreSwiper navigation={{ prevEl, nextEl }}>
        {images.map(({ result }) => (
          <SwiperSlide key={result}>
            <img src={result} alt="" className={styles.img} />
          </SwiperSlide>
        ))}
        <div className={isHidden ? styles.hide : styles.wrapperArrows}>
          <button ref={node => setPrevEl(node)} className={styles.itemArrow}>
            <ArrowSwiperCard
              className={`${styles.arrow} ${styles.arrowPrev}`}
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
