import React, { FC } from 'react';
import styles from './index.module.scss';

export interface ItemPageProps {
  images: string[] | undefined;
  choosePicture: (index: number) => () => void;
}

const PicturePanel: FC<ItemPageProps> = ({ images, choosePicture }) => (
  <div className={styles.imageWrapper}>
    {images?.map((path, index) => (
      <button
        key={path}
        className={styles.imageButton}
        onClick={choosePicture(index)}
      >
        <img className={styles.image} src={path} alt="" />
      </button>
    ))}
  </div>
);

export default PicturePanel;
