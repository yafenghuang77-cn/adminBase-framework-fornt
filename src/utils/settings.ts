import { defaultSettings, type LayoutSettings } from '../config/settings';

const SETTINGS_STORAGE_KEY = 'framework:settings';

export function loadPersistedSettings(): LayoutSettings {
  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    const settings: unknown = stored ? JSON.parse(stored) : null;
    if (typeof settings === 'object' && settings !== null && !Array.isArray(settings)) {
      return { ...defaultSettings, ...(settings as Partial<LayoutSettings>) };
    }
  } catch {
    // 存储不可用或数据损坏时使用默认配置。
  }
  return { ...defaultSettings };
}

export function savePersistedSettings(settings: LayoutSettings): boolean {
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
}
