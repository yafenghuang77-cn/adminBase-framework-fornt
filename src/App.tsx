import './App.css';

import { useEffect } from 'react';

import { Navigate, Outlet, useLocation, useMatches } from '@tanstack/react-router';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import NetworkStatus from './components/NetworkStatus';
import useReducedMotion from './hooks/useReducedMotion';
import BasicLayout from './layouts/BasicLayout';
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
  const settings = usePreferences((state) => state.settings);
  useEffect(() => {
    document.body.style.filter = settings.colorWeak ? 'invert(80%)' : '';
    return () => {
      document.body.style.filter = '';
    };
  }, [settings.colorWeak]);
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        cssVar: { key: `adminbase-${settings.navTheme}-${settings.colorPrimary?.slice(1)}` },
        token: { colorPrimary: settings.colorPrimary, motion: !reducedMotion },
        algorithm: settings.navTheme === 'realDark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntApp>
        <NetworkStatus />
        <AppContent />
      </AntApp>
    </ConfigProvider>
  );
}
