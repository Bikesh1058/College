import { createContext } from 'react';

export const AlertContext = createContext({
  alert: async () => {},
  confirm: async () => false,
  showToast: () => {}
});

