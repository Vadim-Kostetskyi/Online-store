import React from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import PaymentInput from 'modules/order/components/PaymentInput';
import useFormNormalization from './hooks/useFormNormalization';
import { useValidationRules } from './hooks/useValidationRules';

export interface PaymentForm {
  cardNumber: string;
  cardHolder: string;
  month: number;
  year: number;
  cvv: number;
}

const PaymentDetail = () => {
  const { t: defaultT } = useTranslation();
  const { normalizeCVV, normalizeCardNumber } = useFormNormalization();
  const { requiredInput, cardNumberRules, cvvRules } = useValidationRules();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentForm>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<PaymentForm> = () => {
    // axios request to backend payment endpoint
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.wrapperData}>
        <PaymentInput
          register={register}
          rules={cardNumberRules}
          id="cardNumber"
          name="cardNumber"
          className={clsx(
            styles.input,
            errors?.cardNumber && styles.inputError,
          )}
          type="tel"
          placeholder={'0000 0000 0000 0000'}
          autoComplete="cc-number"
          inputMode="numeric"
          errors={errors}
          normalize={normalizeCardNumber}
        />
        <PaymentInput
          register={register}
          rules={requiredInput}
          id="cardHolder"
          name="cardHolder"
          className={clsx(
            styles.input,
            errors?.cardHolder && styles.inputError,
          )}
          type="text"
          placeholder={defaultT('payment.cardHolder')}
          errors={errors}
        />
        <PaymentInput
          register={register}
          rules={requiredInput}
          id="month"
          name="month"
          className={clsx(styles.input, errors?.month && styles.inputError)}
          type="number"
          placeholder={defaultT('Month')}
          errors={errors}
        />
        <PaymentInput
          register={register}
          rules={requiredInput}
          id="year"
          name="year"
          className={clsx(styles.input, errors?.year && styles.inputError)}
          type="number"
          placeholder={defaultT('Year')}
          errors={errors}
        />
        <PaymentInput
          register={register}
          rules={cvvRules}
          id="cvv"
          type="password"
          name="cvv"
          className={clsx(styles.input, errors?.cvv && styles.inputError)}
          placeholder="CVV"
          errors={errors}
          normalize={normalizeCVV}
        />
      </form>
      <div className={styles.wrapperButton}>
        <button onClick={() => {}}>
          <p>{defaultT('return')}</p>
        </button>
        <button onClick={handleSubmit(onSubmit)}>
          <p>{defaultT('continue')}</p>
        </button>
      </div>
    </div>
  );
};

export default PaymentDetail;
