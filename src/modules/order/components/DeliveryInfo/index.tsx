import React, { FC } from 'react';
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
}) => (
  <button
    className={isHome ? styles.deliveryInfoHome : styles.deliveryInfo}
    onClick={deliverySelection(title)}
  >
    <div>
      <img src={icon} alt={iconAlt} />
      <div>
        <div>
          <h1>{title}</h1>
          {isHome ? null : (
            <span className={price === 'Free' ? styles.free : styles.price}>
              {price}
            </span>
          )}
        </div>
        <p>{workDays}</p>
        {isHome ? (
          <span className={price === 'Free' ? styles.free : styles.price}>
            {price}
          </span>
        ) : null}
      </div>
    </div>
    <DashedEdit />
  </button>
);

export default DeliveryInfo;
