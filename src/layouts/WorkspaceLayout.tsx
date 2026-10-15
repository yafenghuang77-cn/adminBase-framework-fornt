import { createPortal } from 'react-dom';

import {
  DownOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ProLayout, SettingDrawer } from '@ant-design/pro-components/layout';
import { Link, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { Avatar, Dropdown } from 'antd';

import BrandSwitcher from '../components/BrandSwitcher';
import { navigation } from '../config/navigation';
import { usePreferences } from '../state/preferences';

export default function WorkspaceLayout() {
  const { settings, updateSettings, language, changeLanguage } = usePreferences();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (pathname.startsWith('/account/') || pathname === '/user/login') {
    return <Outlet />;
  }

  return (
    <>
      <ProLayout
        {...settings}
        logo="/logo.svg"
        location={{ pathname }}
        route={{ path: '/', routes: navigation }}
        menu={{ locale: false, defaultOpenAll: false }}
        onMenuHeaderClick={() => void navigate({ to: '/welcome' })}
        menuItemRender={(item, dom) =>
          item.path && !item.children ? <Link to={item.path}>{dom}</Link> : dom
        }
        avatarProps={{
          title: 'ProUser',
          size: 'small',
          render: () => (
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  { key: '/account/center', icon: <UserOutlined />, label: '个人中心' },
                  { key: '/account/settings', icon: <SettingOutlined />, label: '个人设置' },
                  { type: 'divider' },
                  { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true },
                ],
                onClick: ({ key }) => {
                  if (key === 'logout') {
                    localStorage.removeItem('token');
                    void navigate({ to: '/user/login' });
                  } else {
                    void navigate({ to: key });
                  }
                },
              }}
            >
              <button type="button" className="header-avatar" aria-label="用户菜单">
                <Avatar size={26} icon={<UserOutlined />} className="header-user-icon" />
                <span className="header-user-name">ProUser</span>
                <DownOutlined className="header-user-chevron" aria-hidden="true" />
              </button>
            </Dropdown>
          ),
        }}
        actionsRender={() => [
          <BrandSwitcher key="brand" />,
          <Dropdown
            key="language"
            trigger={['click']}
            menu={{
              selectable: true,
              selectedKeys: [language],
              items: [
                { key: 'zh-CN', label: '简体中文' },
                { key: 'en-US', label: 'English' },
              ],
              onClick: ({ key }) => changeLanguage(key === 'en-US' ? 'en-US' : 'zh-CN'),
            }}
          >
            <button type="button" className="header-language" aria-label="切换语言">
              <GlobalOutlined />
            </button>
          </Dropdown>,
        ]}
      >
        <div className="workspace-page">
          <Outlet />
        </div>
      </ProLayout>
      {pathname === '/welcome' &&
        createPortal(
          <SettingDrawer disableUrlParams settings={settings} onSettingChange={updateSettings} />,
          document.body,
        )}
    </>
  );
}
