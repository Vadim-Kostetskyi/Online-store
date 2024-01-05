import React from 'react';
import ManCollection1 from '../../assets/images/collection-man-image-1.png';
import ManCollection2 from '../../assets/images/colection-man-image-2.png';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

const collections: CollectionCardProps[] = [
  {
    id: 0,
    image: ManCollection1,
    text: 'ESSENTIALS',
  },
  {
    id: 1,
    image: ManCollection2,
    text: 'Antoine Griezmann',
  },
];

export interface CollectionCardProps {
  id: number;
  image: string;
  text: string;
}

const Collection = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.componentWrapper}>
      <p className={styles.title}>{t('collections')}</p>
      <div className={styles.cardWrapper}>
        {collections.map(({ id, image, text }) => (
          <div key={id} className={styles.itemsWrapper}>
            <img src={image} alt={text} className={styles.image} />
            <p className={styles.text}>{text}</p>
            <div className={styles.wrapperButton}>
              <button className={styles.button}>{t('viewCollection')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
