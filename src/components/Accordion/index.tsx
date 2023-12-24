import React, { FC, useState, ReactNode } from 'react';
import PlusImg from 'assets/svgs/Plus';
import MinusImg from 'assets/svgs/Minus';
import styles from './index.module.scss';

interface AccordionProps {
  title: string;
  titleStyles?: string;
  defaultOpen?: boolean;
  list?: ReactNode;
  listStyle?: string;
  isMobile?: boolean;
}

const Accordion: FC<AccordionProps> = ({
  title,
  titleStyles,
  defaultOpen = false,
  list,
  listStyle,
  isMobile,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const imageClassName = () => (isMobile ? styles.mobileImg : styles.img);

  return (
    <div className={styles.accordion}>
      <button className={styles.box} onClick={toggleAccordion}>
        <p className={titleStyles}>{title}</p>
        {isOpen ? (
          <MinusImg className={imageClassName()} />
        ) : (
          <PlusImg className={imageClassName()} />
        )}
      </button>
      <div className={isOpen ? listStyle : styles.hide}>{list}</div>
    </div>
  );
};

export default Accordion;
