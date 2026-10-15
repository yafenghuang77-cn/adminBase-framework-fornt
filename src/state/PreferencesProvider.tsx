import { type ReactNode, useState } from 'react';

import { notification } from 'antd';

import { type LayoutSettings } from '../config/settings';
import { brands } from '../constants/brands';
import { loadPersistedBrand, savePersistedBrand } from '../utils/brand';
import { loadPersistedSettings, savePersistedSettings } from '../utils/settings';
import { PreferencesContext } from './preferences';

function loadLanguage(): 'zh-CN' | 'en-US' {
  try {
    return localStorage.getItem('umi_locale') === 'en-US' ? 'en-US' : 'zh-CN';
  } catch {
    return 'zh-CN';
  }
}

export default function PreferencesProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(loadPersistedSettings);
  const [brand, setBrand] = useState(loadPersistedBrand);
  const [language, setLanguage] = useState(loadLanguage);
  const [api, contextHolder] = notification.useNotification();

  const updateSettings = (next: Partial<LayoutSettings>) => {
    const merged = { ...settings, ...next };
    if (!savePersistedSettings(merged)) {
      api.error({
        title: '风格设置保存失败',
        description: '无法保存配置，请检查浏览器存储设置后重试。',
      });
      return;
    }
    setSettings(merged);
  };

  const switchBrand = (id: string) => {
    const next = brands.find((item) => item.id === id);
    if (!next || next.id === brand.id) {
      return;
    }
    if (!savePersistedBrand(next)) {
      api.error({
        title: '品牌切换失败',
        description: '无法保存品牌选择，请检查浏览器存储设置后重试。',
      });
      return;
    }
    setBrand(next);
  };

  const changeLanguage = (next: 'zh-CN' | 'en-US') => {
    try {
      localStorage.setItem('umi_locale', next);
      setLanguage(next);
    } catch {
      api.error({
        title: '语言切换失败',
        description: '无法保存语言选择，请检查浏览器存储设置后重试。',
      });
    }
  };

  return (
    <PreferencesContext
      value={{ settings, updateSettings, brand, switchBrand, language, changeLanguage }}
    >
      {contextHolder}
      {children}
    </PreferencesContext>
  );
}
