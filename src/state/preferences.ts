import { createContext, useContext } from 'react';

import type { LayoutSettings } from '../config/settings';
import type { Brand } from '../constants/brands';

export interface Preferences {
  settings: LayoutSettings;
  updateSettings: (next: Partial<LayoutSettings>) => void;
  brand: Brand;
  switchBrand: (id: string) => void;
  language: 'zh-CN' | 'en-US';
  changeLanguage: (language: 'zh-CN' | 'en-US') => void;
}

export const PreferencesContext = createContext<Preferences | null>(null);

export function usePreferences() {
  const preferences = useContext(PreferencesContext);
  if (!preferences) {
    throw new Error('PreferencesProvider is required');
  }
  return preferences;
}
