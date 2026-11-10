import { useContext } from 'react';
import { SiteSettingsContext } from './settingsContextDef';

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

