import { type ProSettings } from '@ant-design/pro-components';

export const defaultSettings: ProSettings = {
  navTheme: 'light',
  colorPrimary: '#1677ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: false,
  colorWeak: false,
};

export function normalizeSettings(value: unknown): ProSettings {
  if (!value || typeof value !== 'object') {
    return { ...defaultSettings };
  }
  const candidate = value as ProSettings;
  const next = { ...defaultSettings };
  if (['light', 'realDark'].includes(candidate.navTheme ?? '')) {
    next.navTheme = candidate.navTheme;
  }
  if (['side', 'top', 'mix'].includes(candidate.layout ?? '')) {
    next.layout = candidate.layout;
  }
  if (['Fluid', 'Fixed'].includes(candidate.contentWidth ?? '')) {
    next.contentWidth = candidate.contentWidth;
  }
  if (/^#[\da-f]{6}$/i.test(candidate.colorPrimary ?? '')) {
    next.colorPrimary = candidate.colorPrimary;
  }
  for (const key of ['fixedHeader', 'fixSiderbar', 'splitMenus', 'colorWeak'] as const) {
    if (typeof candidate[key] === 'boolean') {
      next[key] = candidate[key];
    }
  }
  if (candidate.siderMenuType === 'sub' || candidate.siderMenuType === 'group') {
    next.siderMenuType = candidate.siderMenuType;
  }
  for (const key of ['headerRender', 'footerRender', 'menuRender', 'menuHeaderRender'] as const) {
    if (candidate[key] === false) {
      next[key] = false;
    }
  }
  return next;
}
