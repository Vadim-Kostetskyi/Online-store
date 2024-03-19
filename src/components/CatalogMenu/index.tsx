import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  menuName,
  subcategory,
  category,
} from 'modules/core/containers/Header/menu-data';
import { HeaderMenu } from 'types/types';
import HamburgerMenuItem from 'modules/core/components/HamburgerMenuItem';
import { useGetViewportWidth } from 'hooks';
import { ViewportWidth } from 'utils/constants';
import styles from './index.module.scss';

const CatalogMenu = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [showSubCategory, setShowSubCategory] = useState(false);

  const isMobile = useGetViewportWidth(ViewportWidth.TABLET);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const currentCategory = pathname.split('/')[1];

  useEffect(() => {
    setSelectedCategory(currentCategory);
  }, []);

  const handleCategoryClick = useCallback(
    (label: string) => () => {
      setShowSubCategory(label === HeaderMenu.Clothing);
    },
    [],
  );

  const toggleSubCategory = useCallback(
    (shouldShow: boolean) => () => {
      setShowSubCategory(shouldShow);
    },
    [],
  );

  const getClassName = useCallback((label: string) => {
    switch (label) {
      case HeaderMenu.Clothing:
        return styles.clothing;
      case HeaderMenu.Promotion:
        return styles.promotion;
      default:
        return styles.link;
    }
  }, []);

  const handleSelectCategory = useCallback(
    (category: string) => () => {
      setSelectedCategory(category);
    },
    [],
  );

  const setCurrentCategory = useCallback(() => {
    setSelectedCategory(currentCategory);
  }, []);

  const menuClassName = useMemo(
    () => (label: string) => {
      return selectedCategory?.toLocaleLowerCase() === label.toLowerCase()
        ? styles.item
        : '';
    },
    [selectedCategory],
  );

  const toggleCategory = useCallback(
    (category: string) => () => {
      setSelectedCategory(category);
      setShowSubCategory(!showSubCategory);
    },
    [],
  );

  return (
    <nav className={styles.menu}>
      <ul onMouseLeave={toggleSubCategory(false)}>
        {menuName.map(({ id, href, label }) => (
          <li key={id}>
            {isMobile ? (
              <button
                className={menuClassName(label)}
                onClick={toggleCategory(label)}
              >
                {t('listItem', { label })}
              </button>
            ) : (
              <Link
                className={menuClassName(label)}
                to={href}
                onMouseEnter={handleSelectCategory(label)}
                onMouseLeave={setCurrentCategory}
                onClick={handleSelectCategory(label)}
              >
                {t('listItem', { label })}
              </Link>
            )}
            <ul
              className={category[label].length ? styles.categoryWrapper : ''}
              onMouseEnter={handleSelectCategory(label)}
              onMouseLeave={setCurrentCategory}
            >
              <li>
                {isMobile ? (
                  <div
                    className={
                      selectedCategory === label
                        ? styles.menuListContainer
                        : styles.menuListContainerHide
                    }
                  >
                    <HamburgerMenuItem
                      menuItems={subcategory}
                      itemLabel={label}
                      menuOptions={category}
                    />
                  </div>
                ) : (
                  category[label].map(({ id, href, label }) => (
                    <Link
                      to={href}
                      key={id}
                      className={getClassName(label)}
                      onClick={handleCategoryClick(label)}
                    >
                      {t('listItem', { label })}
                    </Link>
                  ))
                )}
              </li>
              <li
                className={
                  showSubCategory ? styles.clothingListWrapper : styles.hide
                }
              >
                <ul className={styles.subcategoryWrapper}>
                  {subcategory[label].map(({ id, href, label }) => (
                    <Link
                      to={href}
                      key={id}
                      className={
                        id ? styles.subcategoryLink : styles.linkSeeAll
                      }
                    >
                      {t('listItem', { label })}
                    </Link>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CatalogMenu;
