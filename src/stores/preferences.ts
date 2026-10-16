import { type ProSettings } from '@ant-design/pro-components';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { brands } from '../config/brands';
import { defaultSettings, normalizeSettings } from '../config/settings';
import { type Locale } from '../locales';

interface Preferences {
  brandId: string;
  locale: Locale;
  settings: ProSettings;
  setBrand: (brandId: string) => void;
  setLocale: (locale: Locale) => void;
  setSettings: (settings: Partial<ProSettings>) => void;
  resetSettings: () => void;
}

export const usePreferences = create<Preferences>()(
  persist(
    (set) => ({
      brandId: brands[0].id,
      locale: 'zh-CN',
      settings: { ...defaultSettings },
      setBrand: (brandId) => {
        if (brands.some((brand) => brand.id === brandId)) {
          set({ brandId });
        }
      },
      setLocale: (locale) => set({ locale }),
      setSettings: (settings) =>
        set((state) => ({ settings: normalizeSettings({ ...state.settings, ...settings }) })),
      resetSettings: () => set({ settings: { ...defaultSettings } }),
    }),
    {
      name: 'adminbase:preferences',
      partialize: ({ brandId, locale, settings }) => ({ brandId, locale, settings }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<Preferences> | undefined;
        return {
          ...current,
          brandId: brands.find((brand) => brand.id === saved?.brandId)?.id ?? brands[0].id,
          locale: saved?.locale === 'en-US' ? 'en-US' : 'zh-CN',
          settings: normalizeSettings(saved?.settings),
        };
      },
    },
  ),
);

interface Session {
  userName: string;
  signedOut: boolean;
  signIn: (name: string) => void;
  signOut: () => void;
  setUserName: (name: string) => void;
}

export const useSession = create<Session>()(
  persist(
    (set) => ({
      userName: 'ProUser',
      signedOut: false,
      signIn: (name) => set({ userName: name.trim(), signedOut: false }),
      signOut: () => set({ userName: '', signedOut: true }),
      setUserName: (name) => set({ userName: name.trim() }),
    }),
    {
      name: 'adminbase:session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ userName, signedOut }) => ({ userName, signedOut }),
    },
  ),
);
