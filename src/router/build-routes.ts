import {
  type AnyContext,
  type AnyRoute,
  type AnyRouter,
  createRoute,
  Outlet,
  redirect,
  type Route,
} from '@tanstack/react-router';

import { type AppRoute } from './types';

type ChildPath<TPath extends string, TParentPath extends string> = TPath extends '*'
  ? '$'
  : TPath extends TParentPath
    ? '/'
    : TParentPath extends '/'
      ? TPath
      : TPath extends `${TParentPath}/${infer TChild}`
        ? TChild
        : never;

type NativeRoute<TConfig extends AppRoute, TParent extends AnyRoute> = ReturnType<
  typeof createRoute<unknown, TParent, ChildPath<TConfig['path'], TParent['types']['fullPath']>>
>;

// Retain the literal paths and child hierarchy when mapping the configuration array.
type ConfiguredRoute<TConfig extends AppRoute, TParent extends AnyRoute> = Route<
  unknown,
  TParent,
  NativeRoute<TConfig, TParent>['types']['path'],
  NativeRoute<TConfig, TParent>['types']['fullPath'],
  string,
  NativeRoute<TConfig, TParent>['types']['id'],
  undefined,
  NativeRoute<TConfig, TParent>['types']['params'],
  AnyContext,
  AnyContext,
  AnyContext,
  NativeRoute<TConfig, TParent>['types']['loaderDeps'],
  undefined,
  TConfig extends { routes: infer TChildren extends readonly AppRoute[] }
    ? ConfiguredRoutes<TChildren, NativeRoute<TConfig, TParent>>
    : unknown
>;

type ConfiguredRoutes<TConfigs extends readonly AppRoute[], TParent extends AnyRoute> = {
  [TIndex in keyof TConfigs]: ConfiguredRoute<TConfigs[TIndex], TParent>;
};

export function buildRoutes<const TConfigs extends readonly AppRoute[], TParent extends AnyRoute>(
  configs: TConfigs,
  parent: TParent,
  parentPath = '/',
): ConfiguredRoutes<TConfigs, TParent> {
  const children = configs.map((config) => {
    if (
      parentPath !== '/' &&
      config.path !== parentPath &&
      !config.path.startsWith(`${parentPath}/`)
    ) {
      throw new Error(`子路由 ${config.path} 必须位于 ${parentPath} 下`);
    }
    const path =
      config.path === '*'
        ? '$'
        : config.path === parentPath
          ? '/'
          : parentPath === '/'
            ? config.path
            : config.path.slice(parentPath.length + 1);
    const route = createRoute({
      getParentRoute: () => parent,
      path,
      component: config.component ?? Outlet,
      staticData: { name: config.name, locale: config.locale, layout: config.layout },
      beforeLoad: config.redirect
        ? () => {
            throw redirect<AnyRouter>({ to: config.redirect, replace: true });
          }
        : undefined,
    });
    return config.routes
      ? route.addChildren(buildRoutes(config.routes, route, config.path))
      : route;
  });
  // Array.map cannot preserve tuple types; the native routes above follow this exact hierarchy.
  return children as unknown as ConfiguredRoutes<TConfigs, TParent>;
}
