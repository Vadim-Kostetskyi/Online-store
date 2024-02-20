import React, { FC, useCallback, useState } from 'react';
import { BodySearchProducts } from 'redux/types';
import { getButtons, getFilterButtons } from './data';
import { useTranslation } from 'react-i18next';
import { Category, Subcategory } from 'types/types';
import styles from './index.module.scss';

interface FilterTabButtons {
  handleClick?: (body: BodySearchProducts) => void;
  filter?: boolean;
  handleClickFiler?: (name: string) => void;
}

const FilterTabButtons: FC<FilterTabButtons> = ({
  handleClick,
  filter,
  handleClickFiler,
}) => {
  const { t } = useTranslation();

  const buttons = filter ? getFilterButtons(t) : getButtons(t);
  const [active, setActive] = useState<string>(buttons[0].value);

  const onClick = useCallback(
    (name: string, body: BodySearchProducts) => () => {
      handleClick && handleClick(body);
      handleClickFiler && handleClickFiler(name);
      setActive(name);
    },
    [],
  );

  return (
    <div
      className={filter ? styles.buttonsFilterWrapper : styles.buttonsWrapper}
    >
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
            className={value === active ? styles.active : styles.button}
            onClick={onClick(name, body)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabButtons;
