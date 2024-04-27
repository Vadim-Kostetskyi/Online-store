import React, { useCallback, useState } from 'react';
import DeliveryInfo, {
  DeliveryInfoProps,
} from 'modules/order/components/DeliveryInfo';
import PersonalData from 'modules/order/components/PersonalData';
import Gift from 'assets/svgs/Gift.svg';
import Truck from 'assets/svgs/Truck.svg';
import Box from 'assets/svgs/Box.svg';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

interface DeliveryProps {
  icon: string;
  iconAlt: string;
  title: string;
  workDays: string;
  price: string;
  isHome?: boolean;
  deliverySelection: (typeOfDelivery: string) => () => void;
}

const Delivery = () => {
  const [deliveryType, setDeliveryType] = useState('');

  const { t } = useTranslation();

  const deliverySelection = (typeOfDelivery: string) => () => {
    setDeliveryType(typeOfDelivery);
  };

  const deliverySelectionButtons: DeliveryProps[] = [
    {
      icon: Box,
      iconAlt: t('box'),
      title: t('order.homeDelivery'),
      workDays: t('order.workDays'),
      price: t('free'),
      isHome: true,
      deliverySelection,
    },
    {
      icon: Truck,
      iconAlt: t('truck'),
      title: t('order.postServices'),
      workDays: t('order.workDays'),
      price: 'From 9.99 €',
      deliverySelection,
    },
    {
      icon: Gift,
      iconAlt: t('gift'),
      title: t('order.sendOrderAsGift'),
      workDays: t('order.workDays'),
      price: t('free'),
      deliverySelection,
    },
  ];

  const handleReturn = useCallback(() => setDeliveryType(''), []);

  return (
    <div className={styles.wrapper}>
      {deliveryType ? (
        <PersonalData back={handleReturn} deliveryType={deliveryType} />
      ) : (
        deliverySelectionButtons.map((prop: DeliveryInfoProps) => (
          <DeliveryInfo {...prop} key={prop.title} />
        ))
      )}
    </div>
  );
};

export default Delivery;
