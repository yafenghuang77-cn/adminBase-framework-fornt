import {
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import { Avatar, Button, Dropdown, Tooltip } from 'antd';

import { useSession } from '../../stores/preferences';

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
  const navigate = useNavigate();
  const userName = useSession((state) => state.userName);
  const signOut = useSession((state) => state.signOut);
  return (
    <div className="header-actions">
      {isMobile && (
        <Button
          type="text"
          className="header-control"
          aria-label={collapsed ? '展开菜单' : '收起菜单'}
          aria-expanded={!collapsed}
          onClick={onToggleMenu}
          icon={<MenuOutlined aria-hidden="true" />}
        />
      )}
      <Tooltip title="布局设置">
        <Button
          type="text"
          className="header-control"
          onClick={onOpenSettings}
          aria-label="布局设置"
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
              label: '个人中心',
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: '个人设置',
            },
            { type: 'divider' },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: '退出登录',
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
        <button type="button" className="header-avatar" aria-label="用户菜单">
          <Avatar size={26} icon={<UserOutlined />} className="header-user-icon" />
          <span className="header-user-name">{userName}</span>
          <DownOutlined className="header-user-chevron" aria-hidden="true" />
        </button>
      </Dropdown>
    </div>
  );
}
