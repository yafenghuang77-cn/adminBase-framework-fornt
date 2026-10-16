import {
  DownOutlined,
  GlobalOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import { Avatar, Button, Dropdown, Tooltip } from 'antd';
import { useIntl } from 'react-intl';

import { usePreferences, useSession } from '../../stores/preferences';
import BrandSwitcher from '../BrandSwitcher';

interface HeaderActionsProps {
  onOpenSettings: () => void;
  isMobile?: boolean;
  collapsed: boolean;
  onToggleMenu: () => void;
}

export default function HeaderActions({
  onOpenSettings,
  isMobile,
  collapsed,
  onToggleMenu,
}: HeaderActionsProps) {
  const intl = useIntl();
  const navigate = useNavigate();
  const locale = usePreferences((state) => state.locale);
  const setLocale = usePreferences((state) => state.setLocale);
  const userName = useSession((state) => state.userName);
  const signOut = useSession((state) => state.signOut);
  return (
    <div className="header-actions">
      {isMobile && (
        <Button
          type="text"
          className="header-control"
          aria-label={intl.formatMessage({ id: collapsed ? 'action.expand' : 'action.collapse' })}
          aria-expanded={!collapsed}
          onClick={onToggleMenu}
          icon={<MenuOutlined aria-hidden="true" />}
        />
      )}
      <BrandSwitcher />
      <Dropdown
        trigger={['click']}
        menu={{
          selectable: true,
          selectedKeys: [locale],
          items: [
            { key: 'zh-CN', label: '简体中文' },
            { key: 'en-US', label: 'English' },
          ],
          onClick: ({ key }) => setLocale(key === 'en-US' ? 'en-US' : 'zh-CN'),
        }}
      >
        <Button
          type="text"
          className="header-control"
          aria-label={intl.formatMessage({ id: 'action.language' })}
          icon={<GlobalOutlined aria-hidden="true" />}
        />
      </Dropdown>
      <Tooltip title={intl.formatMessage({ id: 'action.settings' })}>
        <Button
          type="text"
          className="header-control"
          onClick={onOpenSettings}
          aria-label={intl.formatMessage({ id: 'action.settings' })}
          icon={<SettingOutlined aria-hidden="true" />}
        />
      </Tooltip>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            {
              key: 'center',
              icon: <UserOutlined />,
              label: intl.formatMessage({ id: 'account.center' }),
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: intl.formatMessage({ id: 'account.settings' }),
            },
            { type: 'divider' },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: intl.formatMessage({ id: 'account.logout' }),
              danger: true,
            },
          ],
          onClick: ({ key }) => {
            if (key === 'logout') {
              signOut();
              void navigate({ to: '/user/login', replace: true });
            } else {
              void navigate({ to: key === 'center' ? '/account/center' : '/account/settings' });
            }
          },
        }}
      >
        <button
          type="button"
          className="header-avatar"
          aria-label={intl.formatMessage({ id: 'account.menu' })}
        >
          <Avatar size={26} icon={<UserOutlined />} className="header-user-icon" />
          <span className="header-user-name">{userName}</span>
          <DownOutlined className="header-user-chevron" aria-hidden="true" />
        </button>
      </Dropdown>
    </div>
  );
}
