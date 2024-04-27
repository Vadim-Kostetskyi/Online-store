import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useExtractFromPath = (delimiter: string) => {
  const [extractedValue, setExtractedValue] = useState('');
  const navigate = useNavigate();

  const path = window.location.pathname.split(delimiter + '/');
  useEffect(() => {
    setExtractedValue(path[1]);
  }, [navigate]);

  return extractedValue;
};

export default useExtractFromPath;
