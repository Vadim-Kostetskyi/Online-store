import React from 'react';
import { getValidClassNames } from 'helpers';
import styles from './index.module.scss';

interface PageLinkProps {
  pageNumber: number;
  activePage: number;
  handleClick: (pageNumber: number) => void;
}

const PageLink = ({
  pageNumber,
  activePage,
  handleClick,
}: PageLinkProps): JSX.Element => (
  <li
    className={getValidClassNames(styles.pageButton, {
      [styles.pageButtonActive]: pageNumber === activePage,
    })}
    onClick={() => handleClick(pageNumber)}
  >
    {pageNumber}
  </li>
);

export default PageLink;
