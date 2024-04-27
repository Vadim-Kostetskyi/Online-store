import React, { FC, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Input from 'modules/core/components/Input';
import { personalDataItems } from './data';
import { validPhoneCode, validPhoneNumber } from 'utils/validate';
import { CountyPhoneCode } from 'utils/constants';
import styles from './index.module.scss';

export interface PersonalDataProps {
  back: () => void;
  deliveryType: string;
}

export interface PersonalDataForm {
  firstName: string;
  lastName: string;
  prefix: number;
  number: number;
  email: string;
  address: string;
  information: string;
  zipCode: number;
  city: string;
  state: string;
}

const PersonalData: FC<PersonalDataProps> = ({ back, deliveryType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDataForm>();
  const { t } = useTranslation();

  const sendCustomerInformation: SubmitHandler<PersonalDataForm> = useCallback(
    data => {
      //TODO send information to the backend and move to the next step
      console.log('deliveryType:', deliveryType, data);
    },
    [],
  );

  return (
    <form
      className={styles.personalData}
      onSubmit={handleSubmit(sendCustomerInformation)}
    >
      {personalDataItems.map(({ title, inputs }, index) => (
        <div
          key={title}
          className={index ? styles.wrapperDetails : styles.wrapperData}
        >
          <h1>{title}</h1>
          <div>
            {inputs.map(({ id, placeholder, type }) => (
              <>
                {placeholder === CountyPhoneCode.UKRAINE ? (
                  <form>
                    <textarea
                      id={id}
                      rows={1}
                      className={
                        errors.prefix ? styles.prefixError : styles.prefix
                      }
                      placeholder=""
                      {...register(id, {
                        required: true,
                        value: '+380',
                        validate: validPhoneCode,
                      })}
                    ></textarea>
                    <span>
                      Prefix * <br />
                      +380
                    </span>
                  </form>
                ) : (
                  <Input
                    id={id}
                    className={styles.input}
                    type={type}
                    placeholder={placeholder}
                    isAnimated={true}
                    text={t('order.warning')}
                    register={register}
                    required={id === 'information' ? false : true}
                    validate={id === 'number' ? validPhoneNumber : undefined}
                    errors={errors}
                  />
                )}
              </>
            ))}
            {index ? <div className={styles.state}>{t('country')}</div> : null}
          </div>
        </div>
      ))}
      <p>{t('consent')}</p>
      <div>
        <button onClick={back}>
          <p>{t('return')}</p>
        </button>
        <button type="submit">
          <p>{t('continue')}</p>
        </button>
      </div>
      <Link to={'#'}>
        <u>{t('privacyPolicy')}</u>
      </Link>
    </form>
  );
};

export default PersonalData;
