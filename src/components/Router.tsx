import React from "react";
import { useRoutes, useRedirect, HookRouter } from "hookrouter";

type PropsType = {
  routes: HookRouter.RouteObject;
  whenNotFound: Function;
  redirect?: {
    from: string;
    to: string;
  };
};

const Router = (props: PropsType) => {
  const { from = "/", to = "/" } = props.redirect || {};
  useRedirect(from, to);
  const routeResult = useRoutes(props.routes);

  return routeResult || <props.whenNotFound />;
};

export default Router;
