import React, { useCallback, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CatalogMenu from 'components/CatalogMenu';
// import HamburgerMenu from 'modules/core/components/HamburgerMenu';
import TopBar from 'modules/core/components/TopBar';
import Input from 'modules/core/components/Input';
import logo from 'assets/images/logo.png';
import Search from 'assets/svgs/Search';
import Menu from 'assets/svgs/Menu';
import Cross from 'assets/svgs/Cross';
import styles from './index.module.scss';

const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleOpenMenu = useCallback(
    () => () => setIsMenuOpen(prev => !prev),
    [],
  );

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div
          className={
            isHomePage ? styles.headerWrapperHomePage : styles.headerWrapper
          }
        >
          {/* TODO: refactor this logic */}
          {isHomePage ? null : (
            <nav className={styles.navigation}>
              <button
                className={styles.openMenuButton}
                onClick={toggleOpenMenu()}
              >
                {isMenuOpen ? (
                  <Cross className={styles.crossIcon} />
                ) : (
                  <Menu className={styles.menuIconMobile} />
                )}
              </button>
              <div className={styles.wrapperMenu}>
                <CatalogMenu />
              </div>
            </nav>
          )}
          {isHomePage ? (
            <img src={logo} className={styles.logo} alt="Logo" />
          ) : (
            <Link to="/men">
              <img src={logo} className={styles.logo} alt="Logo" />
            </Link>
          )}
          {isHomePage ? null : (
            <div className={styles.userBox}>
              <TopBar />
            </div>
          )}
        </div>
        {isHomePage ? null : (
          <div className={styles.wrapperMenuMobile}>
            {isMenuOpen ? <CatalogMenu /> : null}
            {isMenuOpen ? null : (
              <div className={styles.wrapperInput}>
                <Input
                  Icon={<Search className={styles.inputIcon} />}
                  className={styles.inputMobile}
                  placeholder={t('searchPlaceholder')}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
export { menuName, category, subcategory } from './menu-data';
