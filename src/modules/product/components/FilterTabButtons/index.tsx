import React, { FC, useCallback } from 'react';
import { BodySearchProducts } from 'redux/types';
import { getButtons } from './data';
import { useTranslation } from 'react-i18next';
import { Category, Subcategory } from 'types/types';
import { FIRST_PAGE } from 'utils/constants';

import styles from './index.module.scss';

interface FilterTabButtons {
  activeButton: string;
  setActiveButton: (value: string) => void;
  setActivePage: (page: number) => void;
  handleClick: (body: BodySearchProducts) => void;
}

const FilterTabButtons: FC<FilterTabButtons> = ({
  activeButton,
  setActiveButton,
  handleClick,
  setActivePage,
}) => {
  const { t } = useTranslation();

  const buttons = getButtons(t);

  const onClick = useCallback(
    (value: string, body: BodySearchProducts) => () => {
      handleClick(body);
      setActiveButton(value);
      setActivePage(FIRST_PAGE);
    },
    [],
  );

  return (
    <div className={styles.buttonsWrapper}>
      {buttons?.map(({ name, value }) => {
        const body =
          value === Category.CLOTHING
            ? {
                category: value,
              }
            : {
                subcategory: value as Subcategory,
              };
        return (
          <button
            key={value}
            value={value}
            className={value === activeButton ? styles.active : styles.button}
            onClick={onClick(value, body)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabButtons;
