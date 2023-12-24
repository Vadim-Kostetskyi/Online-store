import React, { FC } from 'react';
import { Color } from 'types';
import styles from './index.module.scss';

export interface ColorProps {
  label: Color;
  content: string;
}

interface ColorSelectionProps {
  colors: ColorProps[];
  chosenColor: Color;
  colorStyles: string;
  chosenColorStyles: string;
  changeColor: (color: Color) => void;
}

const ColorSelection: FC<ColorSelectionProps> = ({
  colors,
  chosenColor,
  changeColor,
  colorStyles,
  chosenColorStyles,
}) => {
  const handleColorChange = (color: Color) => () => {
    changeColor(color);
  };
  return (
    <>
      {colors.map(({ label, content }) => (
        <button
          key={label}
          className={chosenColor === label ? chosenColorStyles : colorStyles}
          onClick={handleColorChange(label)}
        >
          <img className={styles.image} src={content} alt={label} />
        </button>
      ))}
    </>
  );
};
export default ColorSelection;
