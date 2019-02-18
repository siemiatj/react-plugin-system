import React from 'react';
import { IndexRoute, NoMatch, Route } from 'react-router';

export const getRoutes = (store, plugins) => {
  const getPluginsRoutes = plugins => {
    if (plugins.length) {
      const routes = plugins.map(plugin => {
        if (plugin.routes && plugin.routes.length) {
          const pluginRoutes = [...plugin.routes];

          return pluginRoutes[0];
        }

        return [];
      });

      return routes;
    }

    return [];
  };

  const pluginRoutes = getPluginsRoutes(plugins);
  const childRoutes = [
    // your app routes
    ...pluginRoutes,
  ];

  return (
    <Route path="/">
      <Route childRoutes={childRoutes}>
        <IndexRoute component={Todos} />
      </Route>
      <Route path="*" component={NoMatch} />
    </Route>
  );
};
