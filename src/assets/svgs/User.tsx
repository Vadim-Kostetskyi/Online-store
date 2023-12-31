import React from 'react';

const User = ({ className }: { className?: string }): JSX.Element => (
  <svg className={className} viewBox="-2 -2 28 28">
    <path
      fill="#212121"
      stroke="#333"
      strokeWidth="0.6"
      d="M12 11.16c3.072 0 5.544-2.496 5.544-5.544s-2.472-5.568-5.544-5.568-5.544 2.496-5.544 5.568 2.472 5.544 5.544 5.544zM12 1.488c2.28 0 4.104 1.848 4.104 4.104s-1.824 4.128-4.104 4.128-4.104-1.848-4.104-4.104 1.824-4.128 4.104-4.128zM12 12.72c-5.784 0-10.488 4.704-10.488 10.512 0 0.408 0.312 0.72 0.72 0.72s0.72-0.312 0.72-0.72c0-4.992 4.056-9.072 9.048-9.072s9.048 4.080 9.048 9.072c0 0.408 0.312 0.72 0.72 0.72s0.72-0.312 0.72-0.72c0-5.808-4.704-10.512-10.488-10.512z"
    ></path>
  </svg>
);

export default User;
