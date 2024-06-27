import React, { FC, useState } from 'react';
import ArrowRight from 'assets/svgs/ArrowRight';
import styles from './insex.module.scss';

interface PickerAccordionProps {
  title: string;
  list: JSX.Element;
}

const PickerAccordion: FC<PickerAccordionProps> = ({ title, list }) => {
  const [isShowList, setIsShowList] = useState(false);

  const handleShowList = () => {
    setIsShowList(!isShowList);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleShowList}>
        <span>{title}</span>
        <span className={isShowList ? styles.arrowTop : styles.arrowBottom}>
          <ArrowRight />
        </span>
      </button>
      <div className={isShowList ? styles.list : styles.listHide}>{list}</div>
    </div>
  );
};

export default PickerAccordion;
