import { type ReactNode } from 'react';

import {
  DashboardOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { type MenuDataItem } from '@ant-design/pro-components';

import routes from './routes';
import { type AppRoute } from './types';

type ConfigPath<T> = T extends { path: infer TPath extends string }
  ? | Exclude<TPath, '*'>
    | (T extends { routes: ReadonlyArray<infer TChild> } ? ConfigPath<TChild> : never)
  : never;

export type NavigationPath = ConfigPath<(typeof routes)[number]>;

const icons: Record<string, ReactNode> = {
  HomeOutlined: <HomeOutlined aria-hidden="true" />,
  SettingOutlined: <SettingOutlined aria-hidden="true" />,
  TeamOutlined: <TeamOutlined aria-hidden="true" />,
  FolderOpenOutlined: <FolderOpenOutlined aria-hidden="true" />,
  DashboardOutlined: <DashboardOutlined aria-hidden="true" />,
};

export function getMenuData(): MenuDataItem[] {
  function convert(items: readonly AppRoute[]): MenuDataItem[] {
    return items
      .filter((item) => !item.hideInMenu && !item.redirect && item.path !== '*' && item.name)
      .map((item) => ({
        path: item.path,
        name: item.name,
        icon: item.icon ? icons[item.icon] : undefined,
        children: item.routes ? convert(item.routes) : undefined,
      }));
  }
  return convert(routes);
}
