import React, { FC, useMemo } from 'react';
import { Color } from 'types/types';
import Check from 'assets/svgs/Check';
import Black from 'assets/images/chooseColor/black.png';
import Beige from 'assets/images/chooseColor/beige.png';
import styles from './index.module.scss';

const clothesColors = [
  {
    label: Color.Black,
    content: Black,
  },
  {
    label: Color.Beige,
    content: Beige,
  },
];

interface ColorSelectionProps {
  chosenColor: Color | Color[];
  changeColor: (color: Color) => void;
  multiChoice?: boolean;
}

const ColorSelection: FC<ColorSelectionProps> = ({
  chosenColor,
  changeColor,
  multiChoice,
}) => {
  const setButtonClassName = useMemo(
    () => (label: Color) => {
      if (multiChoice) {
        return styles.multiColor;
      }
      return chosenColor === label ? styles.chosenColor : styles.color;
    },
    [multiChoice, chosenColor],
  );

  return (
    <>
      {clothesColors.map(({ label, content }) => (
        <button
          key={label}
          className={setButtonClassName(label)}
          onClick={() => changeColor(label)}
        >
          {multiChoice ? (
            <div className={styles[label]}>
              <Check
                className={
                  chosenColor.includes(label) ? styles.check : styles.hide
                }
              />
            </div>
          ) : (
            <img className={styles.image} src={content} alt={label} />
          )}
        </button>
      ))}
    </>
  );
};

export default ColorSelection;
