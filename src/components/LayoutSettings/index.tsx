import { useEffect } from 'react';

import { SettingDrawer } from '@ant-design/pro-components';
import { useLocation } from '@tanstack/react-router';
import { Button } from 'antd';

import { usePreferences } from '../../stores/preferences';

export default function LayoutSettings({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isHome = useLocation({
    select: ({ pathname }) => pathname === '/welcome' || pathname === '/welcome/',
  });

  const settings = usePreferences((state) => state.settings);
  const setSettings = usePreferences((state) => state.setSettings);
  const resetSettings = usePreferences((state) => state.resetSettings);

  useEffect(() => {
    if (!open || !isHome) {
      return;
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open, onOpenChange, isHome]);

  if (!isHome) {
    return null;
  }

  return (
    <SettingDrawer
      disableUrlParams
      hideHintAlert
      hideCopyButton
      enableDarkTheme
      collapse={open}
      onCollapseChange={onOpenChange}
      settings={settings}
      onSettingChange={setSettings}
      getContainer={() => document.body}
      drawerProps={{
        closable: true,
        // 直接更新受控状态，避免内部状态回调在 StrictMode 中重放关闭动作。
        onClose: () => onOpenChange(false),
        title: '布局设置',
        extra: (
          <Button size="small" onClick={resetSettings}>
            恢复默认
          </Button>
        ),
      }}
    />
  );
}
