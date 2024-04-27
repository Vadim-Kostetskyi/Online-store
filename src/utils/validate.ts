import { Validate } from 'react-hook-form';
import { PersonalDataForm } from 'modules/order/components/PersonalData';

export const validPhoneCode: Validate<
  string | number,
  PersonalDataForm
> = data => {
  const validCountryCode = /^\+\d{3}$/;

  return validCountryCode.test(String(data));
};

export const validPhoneNumber: Validate<
  string | number,
  PersonalDataForm
> = data => {
  const validNumber = /^\d{7}$/;

  return validNumber.test(String(data));
};
