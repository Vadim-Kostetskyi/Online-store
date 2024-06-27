import React, { FC, useCallback } from 'react';
import { Color } from 'types/types';
import { useGetViewportWidth } from 'hooks';
import { ViewportWidth } from 'utils/constants';
import Check from 'assets/svgs/Check';
import styles from './index.module.scss';

interface ColorSelectionProps {
  colors: Record<Color, string>;
  chosenColor: Color | Color[];
  changeColor: (color: Color) => void;
  multiChoice?: boolean;
}

const ColorSelection: FC<ColorSelectionProps> = ({
  colors,
  chosenColor,
  changeColor,
  multiChoice,
}): JSX.Element => {
  const isMobile = useGetViewportWidth(ViewportWidth.TABLET);

  const setButtonClassName = useCallback(
    (label: Color | string) => {
      if (multiChoice) {
        return styles.multiColor;
      }
      return chosenColor === label ? styles.chosenColor : styles.color;
    },
    [multiChoice, chosenColor],
  );

  return (
    <>
      {Object.entries(colors).map(([label, content]) => (
        <button
          key={label}
          className={setButtonClassName(label)}
          onClick={() => changeColor(label as Color)}
        >
          {multiChoice ? (
            <div className={styles[label]}>
              <Check
                className={
                  chosenColor.includes(label as Color)
                    ? styles.check
                    : styles.hide
                }
              />
            </div>
          ) : (
            <>
              <img className={styles.image} src={content} alt={label} />
              {isMobile ? (
                <span className={styles.colorName}>{label}</span>
              ) : null}
            </>
          )}
        </button>
      ))}
    </>
  );
};

export default ColorSelection;
