import { useEffect } from 'react';

import { onlineManager } from '@tanstack/react-query';
import { App } from 'antd';

export default function NetworkStatus() {
  const { notification } = App.useApp();
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
        title: online ? '网络连接已恢复' : '网络连接已断开',
        description: online ? '您可以继续操作。' : '请检查网络连接，恢复后可继续获取数据。',
        duration: online ? 3 : 0,
      });
    };
    onlineManager.setOnline(previous);
    if (!previous) {
      notification.warning({
        key: 'network-status',
        duration: 0,
        title: '网络连接已断开',
        description: '请检查网络连接，恢复后可继续获取数据。',
      });
    }
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      notification.destroy('network-status');
    };
  }, [notification]);
  return null;
}
