import React from 'react';

export interface ArrowProps {
  isGrey?: boolean;
}

const ArrowLeft = ({ isGrey }: ArrowProps): JSX.Element => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 22L13 16L19 10"
      stroke={isGrey ? '#959595' : '#212121'}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ArrowLeft;
