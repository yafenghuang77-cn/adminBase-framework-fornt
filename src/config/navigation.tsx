import {
  DashboardOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import type { MenuDataItem } from '@ant-design/pro-components/layout';

export const navigation: MenuDataItem[] = [
  { name: '首页', icon: <HomeOutlined />, path: '/welcome' },
  {
    name: '系统管理',
    icon: <SettingOutlined />,
    path: '/admin',
    children: [
      { name: '权限管理', path: '/admin/permissions' },
      {
        name: '配置管理',
        path: '/admin/settings',
        children: [
          { name: '基础配置', path: '/admin/settings/basic' },
          { name: '通知配置', path: '/admin/settings/notifications' },
        ],
      },
    ],
  },
  {
    name: '用户管理',
    icon: <TeamOutlined />,
    path: '/users',
    children: [
      { name: '用户账号', path: '/users/accounts' },
      { name: '用户分组', path: '/users/groups' },
    ],
  },
  {
    name: '文件管理',
    icon: <FolderOpenOutlined />,
    path: '/files',
    children: [{ name: '文件列表', path: '/files/list' }],
  },
  {
    name: '性能统计',
    icon: <DashboardOutlined />,
    path: '/monitoring',
    children: [
      { name: '统计概览', path: '/monitoring/overview' },
      { name: '数据查询', path: '/monitoring/query' },
    ],
  },
];

export const pageNames: Record<string, string> = {
  '/admin/permissions': '权限管理',
  '/admin/settings/basic': '基础配置',
  '/admin/settings/notifications': '通知配置',
  '/users/accounts': '用户账号',
  '/users/groups': '用户分组',
  '/files/list': '文件列表',
  '/monitoring/overview': '统计概览',
  '/monitoring/query': '数据查询',
  '/account/center': '个人中心',
  '/account/settings': '个人设置',
};
