import type { ProLayoutProps, ProSettings } from '@ant-design/pro-components/layout';

export interface LayoutSettings extends ProSettings {
  siderWidth?: number;
  splitMenus?: boolean;
  token?: ProLayoutProps['token'];
  logo?: string;
}

export const defaultSettings: LayoutSettings = {
  navTheme: 'light',
  colorPrimary: '#1677ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: false,
  siderWidth: 256,
  colorWeak: false,
  title: 'Ant Design Pro 管理系统模版',
  logo: '/logo.svg',
  iconfontUrl: '',
  token: {},
};
