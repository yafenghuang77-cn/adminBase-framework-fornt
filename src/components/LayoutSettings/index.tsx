import { useEffect } from 'react';

import { SettingDrawer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useIntl } from 'react-intl';

import { usePreferences } from '../../stores/preferences';

export default function LayoutSettings({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const intl = useIntl();
  const settings = usePreferences((state) => state.settings);
  const setSettings = usePreferences((state) => state.setSettings);
  const resetSettings = usePreferences((state) => state.resetSettings);
  useEffect(() => {
    if (!open) {
      return;
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open, onOpenChange]);
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
        title: intl.formatMessage({ id: 'action.settings' }),
        extra: (
          <Button size="small" onClick={resetSettings}>
            {intl.formatMessage({ id: 'action.reset' })}
          </Button>
        ),
      }}
    />
  );
}
