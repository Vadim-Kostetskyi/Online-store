import React from 'react';

const ShoppingBag = ({ className }: { className?: string }): JSX.Element => (
  <svg className={className} viewBox="0 0 44 44">
    <rect
      fill="none"
      height="30"
      id="svg_1"
      rx="3"
      strokeWidth="3"
      width="28"
      x="10"
      y="12"
    />
    <path
      d="m30,18l0,-8c0,-3.31 -2.69,-6 -6,-6l0,0c-3.31,0 -6,2.69 -6,6l0,8"
      fill="none"
      id="svg_2"
      strokeLinecap="square"
      strokeWidth="3"
    />
  </svg>
);

export default ShoppingBag;
