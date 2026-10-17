import { createRootRoute, createRouter } from '@tanstack/react-router';

import App from '../App';
import ErrorPage from '../pages/Error';
import LoadingPage from '../pages/Loading';
import NotFoundPage from '../pages/NotFound';
import { buildRoutes } from './build-routes';
import routes from './routes';

const rootRoute = createRootRoute({ component: App, notFoundComponent: NotFoundPage });
const routeTree = rootRoute.addChildren(buildRoutes(routes, rootRoute));

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultPendingComponent: LoadingPage,
  defaultErrorComponent: ErrorPage,
  defaultPendingMs: 200,
  basepath: import.meta.env.BASE_URL,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
