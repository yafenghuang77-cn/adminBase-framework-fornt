import './App.css';

import { useEffect } from 'react';

import { Navigate, Outlet, useLocation, useMatches } from '@tanstack/react-router';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { IntlProvider } from 'react-intl';

import NetworkStatus from './components/NetworkStatus';
import useReducedMotion from './hooks/useReducedMotion';
import BasicLayout from './layouts/BasicLayout';
import { messages } from './locales';
import { usePreferences, useSession } from './stores/preferences';

function AppContent() {
  const { pathname } = useLocation();
  const layoutDisabled = useMatches({
    select: (matches) => matches.some((match) => match.staticData.layout === false),
  });
  const signedOut = useSession((state) => state.signedOut);
  if (signedOut && pathname !== '/user/login') {
    return <Navigate to="/user/login" replace />;
  }
  if (layoutDisabled) {
    return <Outlet />;
  }
  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const locale = usePreferences((state) => state.locale);
  const settings = usePreferences((state) => state.settings);
  useEffect(() => {
    document.documentElement.lang = locale;
    // ProComponents 设置抽屉沿用此语言键，无需 Umi 运行时。
    localStorage.setItem('umi_locale', locale);
    document.dispatchEvent(new Event('languagechange'));
  }, [locale]);
  useEffect(() => {
    document.body.style.filter = settings.colorWeak ? 'invert(80%)' : '';
    return () => {
      document.body.style.filter = '';
    };
  }, [settings.colorWeak]);
  return (
    <IntlProvider locale={locale} defaultLocale="zh-CN" messages={messages[locale]}>
      <ConfigProvider
        locale={locale === 'en-US' ? enUS : zhCN}
        theme={{
          cssVar: { key: `adminbase-${settings.navTheme}-${settings.colorPrimary?.slice(1)}` },
          token: { colorPrimary: settings.colorPrimary, motion: !reducedMotion },
          algorithm:
            settings.navTheme === 'realDark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <AntApp>
          <NetworkStatus />
          <AppContent />
        </AntApp>
      </ConfigProvider>
    </IntlProvider>
  );
}
