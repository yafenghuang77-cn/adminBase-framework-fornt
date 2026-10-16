import { useEffect } from 'react';

import { onlineManager } from '@tanstack/react-query';
import { App } from 'antd';
import { useIntl } from 'react-intl';

export default function NetworkStatus() {
  const { notification } = App.useApp();
  const intl = useIntl();
  useEffect(() => {
    let previous = navigator.onLine;
    const update = () => {
      const online = navigator.onLine;
      onlineManager.setOnline(online);
      if (online === previous) {
        return;
      }
      previous = online;
      notification[online ? 'success' : 'warning']({
        key: 'network-status',
        title: intl.formatMessage({ id: online ? 'network.online' : 'network.offline' }),
        description: intl.formatMessage({
          id: online ? 'network.onlineDescription' : 'network.offlineDescription',
        }),
        duration: online ? 3 : 0,
      });
    };
    onlineManager.setOnline(previous);
    if (!previous) {
      notification.warning({
        key: 'network-status',
        duration: 0,
        title: intl.formatMessage({ id: 'network.offline' }),
        description: intl.formatMessage({ id: 'network.offlineDescription' }),
      });
    }
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      notification.destroy('network-status');
    };
  }, [intl, notification]);
  return null;
}
