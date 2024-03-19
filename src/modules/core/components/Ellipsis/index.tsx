import React from 'react';
import styles from './index.module.scss';

const Ellipsis = (): JSX.Element => (
  <li className={styles.ellipsis}>{'...'}</li>
);

export default Ellipsis;
