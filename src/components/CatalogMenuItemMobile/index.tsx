import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem } from 'components/Footer/MenuList';
import Clothing from 'components/ClothingList';
import { HeaderMenu } from 'types';
import Accordion from 'components/Accordion';
import styles from './index.module.scss';

interface CatalogMenuItemProps {
  menuItems: Record<string, MenuItem[]>;
  itemLabel: string;
  menuOptions: Record<string, MenuItem[]>;
}

const CatalogMenuItemMobile: FC<CatalogMenuItemProps> = ({
  menuItems,
  itemLabel,
  menuOptions,
}) => {
  const { t } = useTranslation();

  const isAccordionMenu = (label: string) =>
    ['Clothing', 'Suits', 'Collections'].includes(label);

  const setClassName = (label: string) => {
    const promotion = label === HeaderMenu.Promotion;

    if (promotion) {
      return styles.promotion;
    } else {
      return styles.link;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>
        {menuOptions[itemLabel].map(({ id, href, label }) =>
          isAccordionMenu(label) ? (
            <div key={id}>
              <Accordion
                title={t('listItem', { label })}
                titleStyles={styles.title}
                listStyle={styles.listStyle}
                list={
                  label === 'Clothing' && (
                    <Clothing items={menuItems[itemLabel]} />
                  )
                }
              />
            </div>
          ) : (
            <a href={href} key={id} className={setClassName(label)}>
              {t('listItem', { label })}
            </a>
          ),
        )}
      </div>
    </div>
  );
};

export default CatalogMenuItemMobile;
