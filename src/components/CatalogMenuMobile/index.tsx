import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { menuName, category, subcategory } from '../Header/MenuList';
import CatalogMenuItemMobile from 'components/CatalogMenuItemMobile';
import styles from './index.module.scss';

interface MenuLayoutProps {
  isMobile?: boolean;
}

const CatalogMenuMobile: FC<MenuLayoutProps> = () => {
  const [menuOpen, setMenuOpen] = useState('');
  const { t } = useTranslation();

  const toggleCategory = (name: string) => () => {
    setMenuOpen(name);
  };

  return (
    <div className={styles.menuBox}>
      {menuName.map(({ id, label }) => (
        <div className={styles.menuItem} key={id}>
          <button
            className={
              menuOpen === label
                ? styles.menuItemButtonFocus
                : styles.menuItemButton
            }
            onClick={toggleCategory(label)}
          >
            {t('listItem', { label })}
          </button>
          <div
            className={
              menuOpen === label
                ? styles.menuListContainer
                : styles.menuListContainerHide
            }
          >
            <CatalogMenuItemMobile
              menuItems={subcategory}
              itemLabel={label}
              menuOptions={category}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogMenuMobile;
