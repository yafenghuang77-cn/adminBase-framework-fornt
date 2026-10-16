import { type RouteComponent } from '@tanstack/react-router';

export interface RouteMetadata {
  name?: string;
  locale?: string;
  layout?: boolean;
}

export interface AppRoute extends RouteMetadata {
  path: string;
  icon?: string;
  component?: RouteComponent;
  redirect?: string;
  hideInMenu?: boolean;
  routes?: readonly AppRoute[];
}

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    name?: RouteMetadata['name'];
    locale?: RouteMetadata['locale'];
    layout?: RouteMetadata['layout'];
  }
}
