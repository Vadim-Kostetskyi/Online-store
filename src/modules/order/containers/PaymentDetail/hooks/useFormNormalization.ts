import { useCallback } from 'react';

const useFormNormalization = () => {
  const normalizeCardNumber = useCallback((value: string) => {
    return (
      value
        ?.replace(/\D/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .slice(0, 19) || ''
    );
  }, []);

  const normalizeCVV = useCallback((value: string) => {
    return value?.replace(/\D/g, '').slice(0, 3) || '';
  }, []);

  return { normalizeCardNumber, normalizeCVV };
};

export default useFormNormalization;
