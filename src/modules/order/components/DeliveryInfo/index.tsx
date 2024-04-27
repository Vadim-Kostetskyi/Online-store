import React, { FC, useMemo } from 'react';
import DashedEdit from 'assets/svgs/DashedEdit';
import styles from './index.module.scss';

export interface DeliveryInfoProps {
  icon: string;
  iconAlt: string;
  title: string;
  workDays: string;
  price: string;
  isHome?: boolean;
  deliverySelection: (typeOfDelivery: string) => () => void;
}

const DeliveryInfo: FC<DeliveryInfoProps> = ({
  icon,
  iconAlt,
  title,
  workDays,
  price,
  isHome,
  deliverySelection,
}) => {
  const priceClassName = useMemo(() => {
    return price === 'Free' ? styles.free : styles.price;
  }, [price]);

  return (
    <button
      className={isHome ? styles.deliveryInfoHome : styles.deliveryInfo}
      onClick={deliverySelection(title)}
    >
      <div>
        <img src={icon} alt={iconAlt} />
        <div>
          <div
            className={isHome ? styles.deliveryDataHome : styles.deliveryData}
          >
            <h1>{title}</h1>
            {isHome ? null : <span className={priceClassName}>{price}</span>}
          </div>
          <p>{workDays}</p>
          {isHome ? <span className={priceClassName}>{price}</span> : null}
        </div>
      </div>
      <DashedEdit />
    </button>
  );
};

export default DeliveryInfo;
