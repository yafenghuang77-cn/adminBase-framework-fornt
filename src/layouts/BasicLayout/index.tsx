import { lazy, type ReactNode, Suspense, useState } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { Spin } from 'antd';
import { useIntl } from 'react-intl';

import HeaderActions from '../../components/HeaderActions';
import { getMenuData, type NavigationPath } from '../../router/menu';
import { usePreferences } from '../../stores/preferences';

const LayoutSettings = lazy(() => import('../../components/LayoutSettings'));

export default function BasicLayout({ children }: { children: ReactNode }) {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const settings = usePreferences((state) => state.settings);
  const locale = usePreferences((state) => state.locale);
  const [collapsed, setCollapsed] = useState(() => window.matchMedia('(max-width: 991px)').matches);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsRequested, setSettingsRequested] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main-content">
        {intl.formatMessage({ id: 'action.skip' })}
      </a>
      <ProLayout
        {...settings}
        title={intl.formatMessage({ id: 'app.title' })}
        logo={`${import.meta.env.BASE_URL}logo.svg`}
        locale={locale}
        siderWidth={256}
        location={{ pathname: location.pathname }}
        route={{ path: '/', children: getMenuData(intl) }}
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
            aria-label={intl.formatMessage({
              id: isCollapsed ? 'action.expand' : 'action.collapse',
            })}
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
              setSettingsRequested(true);
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
      {settingsRequested && (
        <Suspense fallback={<Spin fullscreen />}>
          <LayoutSettings open={settingsOpen} onOpenChange={setSettingsOpen} />
        </Suspense>
      )}
    </>
  );
}
