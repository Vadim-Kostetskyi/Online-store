import React, { FC, InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { PaymentForm } from '../../containers/PaymentDetail';
import styles from './index.module.scss';

interface FormErrors {
  [key: string]: {
    message?: string;
  };
}

interface PaymentInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  className: string;
  placeholder: string;
  rules?: RegisterOptions;
  id: string;
  name: keyof PaymentForm;
  errors: FormErrors;
  register: (
    name: keyof PaymentForm,
    options?: RegisterOptions,
  ) => UseFormRegisterReturn;
  onChage?: () => void;
  normalize?: (value: string) => string;
}

const PaymentInput: FC<PaymentInputProps> = ({
  id,
  type,
  name,
  className,
  placeholder,
  register,
  rules,
  errors,
  onChange,
  normalize,
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (normalize) {
      event.target.value = normalize(event.target.value);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div>
      <input
        {...register(name, { ...rules, onChange: handleChange })}
        id={id}
        type={type}
        placeholder={placeholder}
        className={className}
        name={name}
        {...rest}
      />
      {errors?.[name] && (
        <label className={styles.textError}>{errors[name]?.message}</label>
      )}
    </div>
  );
};

export default PaymentInput;
