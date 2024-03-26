import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const OrderStage = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const path = location.pathname.split('/checkout/');
  const stage = path[1].toUpperCase();

  const stages = [t('order.details'), t('order.delivery'), t('order.payment')];

  let stageNumber = 0;
  switch (stage) {
    case 'DETAILS':
      stageNumber = 1;
      break;
    case 'DELIVERY':
      stageNumber = 2;
      break;
    case 'PAYMENT':
      stageNumber = 3;
      break;
    default:
      break;
  }

  const className = (phase: number, element: string) => {
    return stageNumber >= phase ? styles[`${element}Active`] : styles[element];
  };

  return (
    <div className={styles.wrapper}>
      {stages.map((stage, index) => (
        <>
          {index ? <div className={className(index + 1, 'line')}></div> : null}
          <span className={className(index + 1, 'number')}>{index + 1}</span>
          <span className={className(index + 1, 'stage')}>{stage}</span>
        </>
      ))}
    </div>
  );
};

export default OrderStage;
