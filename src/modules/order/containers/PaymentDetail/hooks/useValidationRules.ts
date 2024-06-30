import { useTranslation } from 'react-i18next';

export const useValidationRules = () => {
  const { t: validationT } = useTranslation('validation');

  const requiredInput = {
    required: {
      value: true,
      message: validationT('required'),
    },
  };

  const cardNumberRules = {
    ...requiredInput,
    pattern: {
      value: /(?:\d[ ]*?){16}/,
      message: validationT('invalidCardNumber'),
    },
  };

  const cvvRules = {
    ...requiredInput,
    pattern: {
      value: /\d{3}/,
      message: validationT('invalidCardNumber'),
    },
  };

  return { requiredInput, cardNumberRules, cvvRules };
};
