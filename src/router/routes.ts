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
    path: '/user/login',
    component: Login,
    layout: false,
    hideInMenu: true,
  },
  { path: '/', redirect: '/welcome' },
  {
    name: '首页',
    icon: 'HomeOutlined',
    path: '/welcome',
    component: Home,
  },
  {
    name: '系统管理',
    icon: 'SettingOutlined',
    path: '/admin',
    routes: [
      { path: '/admin', redirect: '/admin/permissions' },
      {
        name: '权限管理',
        path: '/admin/permissions',
        component: Placeholder,
      },
      {
        name: '配置管理',
        path: '/admin/settings',
        routes: [
          { path: '/admin/settings', redirect: '/admin/settings/basic' },
          {
            name: '基础配置',
            path: '/admin/settings/basic',
            component: Placeholder,
          },
          {
            name: '通知配置',
            path: '/admin/settings/notifications',
            component: Placeholder,
          },
        ],
      },
    ],
  },
  {
    name: '用户管理',
    icon: 'TeamOutlined',
    path: '/users',
    routes: [
      { path: '/users', redirect: '/users/accounts' },
      {
        name: '用户账号',
        path: '/users/accounts',
        component: Placeholder,
      },
      { name: '用户分组', path: '/users/groups', component: Placeholder },
    ],
  },
  {
    name: '文件管理',
    icon: 'FolderOpenOutlined',
    path: '/files',
    routes: [
      { path: '/files', redirect: '/files/list' },
      { name: '文件列表', path: '/files/list', component: Placeholder },
    ],
  },
  {
    name: '性能统计',
    icon: 'DashboardOutlined',
    path: '/monitoring',
    routes: [
      { path: '/monitoring', redirect: '/monitoring/overview' },
      {
        name: '统计概览',
        path: '/monitoring/overview',
        component: Placeholder,
      },
      { name: '数据查询', path: '/monitoring/query', component: Placeholder },
    ],
  },
  {
    name: '个人中心',
    path: '/account/center',
    component: AccountCenter,
    hideInMenu: true,
    layout: false,
  },
  {
    name: '个人设置',
    path: '/account/settings',
    component: AccountSettings,
    hideInMenu: true,
    layout: false,
  },
  { path: '*', component: NotFound, hideInMenu: true },
] as const satisfies readonly AppRoute[];
