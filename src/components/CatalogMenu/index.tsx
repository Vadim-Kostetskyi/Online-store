import React from 'react';
import { useTranslation } from 'react-i18next';
import { menuName, subcategory, category } from './MenuList';
import CatalogMenuItem from 'components/CatalogMenuItem';
import { MenuItem } from 'utils/constants';
import styles from './index.module.scss';

const CatalogMenu = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.menuBox}>
      {menuName.map(({ id, href, label }) => (
        <div className={styles.menuItem} key={id}>
          <a href={href} className={styles.menuItemLink}>
            {t('listItem', { label })}
          </a>
          <div className={styles.menuListContainer}>
            {label === MenuItem.MEN && (
              <CatalogMenuItem
                menuItems={subcategory}
                itemLabel={label}
                menuOptions={category}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogMenu;
