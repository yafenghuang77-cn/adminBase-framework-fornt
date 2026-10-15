import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  redirect,
} from '@tanstack/react-router';

import WorkspaceLayout from './layouts/WorkspaceLayout';

const rootRoute = createRootRoute({ component: WorkspaceLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/welcome' });
  },
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/welcome',
  component: lazyRouteComponent(() => import('./pages/Home')),
});

// 业务页尚未接入时，共用占位组件；后续在这里替换对应页面即可。
function moduleRoute<const TPath extends string>(path: TPath) {
  return createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: lazyRouteComponent(() => import('./pages/ModulePage')),
  });
}

const routeTree = rootRoute.addChildren([
  indexRoute,
  homeRoute,
  moduleRoute('/admin/permissions'),
  moduleRoute('/admin/settings/basic'),
  moduleRoute('/admin/settings/notifications'),
  moduleRoute('/users/accounts'),
  moduleRoute('/users/groups'),
  moduleRoute('/files/list'),
  moduleRoute('/monitoring/overview'),
  moduleRoute('/monitoring/query'),
  moduleRoute('/account/center'),
  moduleRoute('/account/settings'),
  moduleRoute('/user/login'),
  moduleRoute('$'),
]);

export const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
