import { lazy, type ReactNode, Suspense, useState } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';

import HeaderActions from '../../components/HeaderActions';
import { getMenuData, type NavigationPath } from '../../router/menu';
import { usePreferences } from '../../stores/preferences';

const LayoutSettings = lazy(() => import('../../components/LayoutSettings'));

export default function BasicLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = usePreferences((state) => state.settings);
  const [collapsed, setCollapsed] = useState(() => window.matchMedia('(max-width: 991px)').matches);
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main-content">
        跳转到主要内容
      </a>
      <ProLayout
        {...settings}
        title="AdminBase 管理系统"
        logo={`${import.meta.env.BASE_URL}logo.svg`}
        locale="zh-CN"
        siderWidth={256}
        location={{ pathname: location.pathname }}
        route={{ path: '/', children: getMenuData() }}
        menu={{ locale: false, defaultOpenAll: false }}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsedButtonRender={(isCollapsed) => (
          <button
            type="button"
            className="sidebar-toggle"
            aria-expanded={!isCollapsed}
            onClick={(event) => {
              event.stopPropagation();
              setCollapsed(!isCollapsed);
            }}
            aria-label={isCollapsed ? '展开菜单' : '收起菜单'}
          >
            {isCollapsed ? (
              <MenuUnfoldOutlined aria-hidden="true" />
            ) : (
              <MenuFoldOutlined aria-hidden="true" />
            )}
          </button>
        )}
        avatarProps={false}
        actionsRender={(props) => [
          <HeaderActions
            key="header"
            isMobile={props.isMobile}
            collapsed={collapsed}
            onToggleMenu={() => setCollapsed((value) => !value)}
            onOpenSettings={() => {
              setSettingsOpen(true);
            }}
          />,
        ]}
        onMenuHeaderClick={() => {
          void navigate({ to: '/welcome' });
        }}
        menuItemRender={(item, dom, props) => (
          <Link
            to={(item.path || '/welcome') as NavigationPath}
            onClick={() => {
              if (props.isMobile) {
                item.onClick();
              }
            }}
          >
            {dom}
          </Link>
        )}
        itemRender={(item) =>
          item.path ? <Link to={item.path as NavigationPath}>{item.title}</Link> : item.title
        }
        footerRender={
          settings.footerRender === false
            ? false
            : () => <div className="workspace-footer">© {new Date().getFullYear()} AdminBase</div>
        }
      >
        <div id="main-content" className="workspace-page" tabIndex={-1}>
          {children}
        </div>
      </ProLayout>
      <Suspense fallback={null}>
        <LayoutSettings open={settingsOpen} onOpenChange={setSettingsOpen} />
      </Suspense>
    </>
  );
}
