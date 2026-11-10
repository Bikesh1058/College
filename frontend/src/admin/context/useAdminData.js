import { useContext } from 'react';
import { AdminDataContext } from './adminDataContextDef';

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}

