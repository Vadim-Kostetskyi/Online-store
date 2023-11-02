import React from 'react';
import CollectionImageSwiper from 'components/CollectionImageSwiper';
import styles from './index.module.scss';

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <CollectionImageSwiper />
    </div>
  );
};

export default MainPage;