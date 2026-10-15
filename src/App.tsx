import './App.css';

import { RouterProvider } from '@tanstack/react-router';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';

import NetworkStatus from './components/NetworkStatus';
import { router } from './router';
import { usePreferences } from './state/preferences';
import PreferencesProvider from './state/PreferencesProvider';

function ThemedApplication() {
  const { settings, language } = usePreferences();
  return (
    <ConfigProvider
      locale={language === 'en-US' ? enUS : zhCN}
      variant="filled"
      theme={{
        cssVar: {},
        algorithm: settings.navTheme === 'realDark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: settings.colorPrimary,
          borderRadius: 6,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        },
      }}
    >
      <AntApp>
        <NetworkStatus />
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <ThemedApplication />
    </PreferencesProvider>
  );
}
