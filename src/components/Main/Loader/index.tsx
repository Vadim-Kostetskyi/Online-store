import React, { FC } from 'react';
import styles from './index.module.scss';
interface LoaderProps {
  width: number;
  height: number;
}

const Loader: FC<LoaderProps> = ({ width, height }) => {
  const loaderStyle = {
    '--loader-width': `${width}px`,
    '--loader-height': `${height}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.loader} style={loaderStyle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
