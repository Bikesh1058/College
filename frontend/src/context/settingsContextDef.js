import { createContext } from 'react';

export const SiteSettingsContext = createContext({
  collegeName: 'Khwopa Secondary School (+2)',
  tagline: 'Dedicated to Country and People',
  phone: '+977-1-6610932, 01-6614336',
  email: 'info@khwopa.edu.np',
  address: 'Dekocha, Bhaktapur, Nepal',
  announcementBanner: { enabled: false, text: '', link: '' }
});

