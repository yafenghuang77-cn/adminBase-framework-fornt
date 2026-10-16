import { lazyRouteComponent } from '@tanstack/react-router';

import NotFound from '../pages/NotFound';
import { type AppRoute } from './types';

const Login = lazyRouteComponent(() => import('../pages/Login'));
const Home = lazyRouteComponent(() => import('../pages/Home'));
const Placeholder = lazyRouteComponent(() => import('../pages/Placeholder'));
const AccountCenter = lazyRouteComponent(() => import('../pages/Account/Center'));
const AccountSettings = lazyRouteComponent(() => import('../pages/Account/Settings'));

export default [
  {
    name: '登录',
    locale: 'login.title',
    path: '/user/login',
    component: Login,
    layout: false,
    hideInMenu: true,
  },
  { path: '/', redirect: '/welcome' },
  {
    name: '首页',
    locale: 'menu.home',
    icon: 'HomeOutlined',
    path: '/welcome',
    component: Home,
  },
  {
    name: '系统管理',
    locale: 'menu.admin',
    icon: 'SettingOutlined',
    path: '/admin',
    routes: [
      { path: '/admin', redirect: '/admin/permissions' },
      {
        name: '权限管理',
        locale: 'menu.permissions',
        path: '/admin/permissions',
        component: Placeholder,
      },
      {
        name: '配置管理',
        locale: 'menu.configuration',
        path: '/admin/settings',
        routes: [
          { path: '/admin/settings', redirect: '/admin/settings/basic' },
          {
            name: '基础配置',
            locale: 'menu.basic',
            path: '/admin/settings/basic',
            component: Placeholder,
          },
          {
            name: '通知配置',
            locale: 'menu.notifications',
            path: '/admin/settings/notifications',
            component: Placeholder,
          },
        ],
      },
    ],
  },
  {
    name: '用户管理',
    locale: 'menu.users',
    icon: 'TeamOutlined',
    path: '/users',
    routes: [
      { path: '/users', redirect: '/users/accounts' },
      {
        name: '用户账号',
        locale: 'menu.accounts',
        path: '/users/accounts',
        component: Placeholder,
      },
      { name: '用户分组', locale: 'menu.groups', path: '/users/groups', component: Placeholder },
    ],
  },
  {
    name: '文件管理',
    locale: 'menu.files',
    icon: 'FolderOpenOutlined',
    path: '/files',
    routes: [
      { path: '/files', redirect: '/files/list' },
      { name: '文件列表', locale: 'menu.fileList', path: '/files/list', component: Placeholder },
    ],
  },
  {
    name: '性能统计',
    locale: 'menu.monitoring',
    icon: 'DashboardOutlined',
    path: '/monitoring',
    routes: [
      { path: '/monitoring', redirect: '/monitoring/overview' },
      {
        name: '统计概览',
        locale: 'menu.overview',
        path: '/monitoring/overview',
        component: Placeholder,
      },
      { name: '数据查询', locale: 'menu.query', path: '/monitoring/query', component: Placeholder },
    ],
  },
  {
    name: '个人中心',
    locale: 'account.center',
    path: '/account/center',
    component: AccountCenter,
    hideInMenu: true,
    layout: false,
  },
  {
    name: '个人设置',
    locale: 'account.settings',
    path: '/account/settings',
    component: AccountSettings,
    hideInMenu: true,
    layout: false,
  },
  { path: '*', component: NotFound, hideInMenu: true },
] as const satisfies readonly AppRoute[];
