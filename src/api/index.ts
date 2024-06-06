import { AgeOfMultipleNamesResponseType } from './types/types';

export const getAgeOfMultipleNames = async (
  name: string | string[]
): Promise<AgeOfMultipleNamesResponseType> => {
  if (!process.env.REACT_APP_BASE_URL) {
    throw TypeError('REACT_APP_BASE_URL is not defined');
  }
  const params = new URLSearchParams();
  if (Array.isArray(name)) {
    name.forEach(n => params.append('name[]', n));
  } else {
    params.append('name', name);
  }

  const queryString = params.toString().replace(/%5B%5D/g, '[]');
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}?${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status === 429) {
    throw new Error('Dzienny limit zapytań API został przekroczony.');
  }

  const value = await response.json();
  return value;
};
