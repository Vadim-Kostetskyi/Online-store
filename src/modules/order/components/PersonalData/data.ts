type PersonalDataItemId =
  | 'number'
  | 'firstName'
  | 'lastName'
  | 'prefix'
  | 'email'
  | 'address'
  | 'information'
  | 'zipCode'
  | 'city'
  | 'state';

type PersonalDataInput =
  | { id: PersonalDataItemId; placeholder: string; type: string }
  | { id: PersonalDataItemId; placeholder: string; type?: undefined };

type PersonalDataItem = {
  title: string;
  inputs: PersonalDataInput[];
};

export const personalDataItems: PersonalDataItem[] = [
  {
    title: 'PERSONAL DATA',
    inputs: [
      { id: 'firstName', placeholder: 'First Name *', type: 'text' },
      { id: 'lastName', placeholder: 'Last Name *', type: 'text' },
      { id: 'prefix', placeholder: 'Prefix *\n+380', type: 'text' },
      { id: 'number', placeholder: 'Cell number *', type: 'number' },
      { id: 'email', placeholder: 'Email *', type: 'email' },
    ],
  },
  {
    title: 'DELIVERY DETAILS',
    inputs: [
      { id: 'address', placeholder: 'Address *', type: 'text' },
      {
        id: 'information',
        placeholder: 'More information (Optional)',
        type: 'text',
      },
      { id: 'zipCode', placeholder: 'Zip code *', type: 'number' },
      { id: 'city', placeholder: 'City *', type: 'text' },
      { id: 'state', placeholder: 'State *', type: 'text' },
    ],
  },
];
