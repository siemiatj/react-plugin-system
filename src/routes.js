import React from 'react';
import { IndexRoute, NoMatch, Route } from 'react-router';

import Dashboard from './components/Dashboard';
import Start from './components/Start';
import Todos from './components/Todos';

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
    {
      path: '/todos(/:filter)',
      component: Todos,
    },
    ...pluginRoutes,
  ];

  return (
    <Route path="/" component={Dashboard}>
      <Route childRoutes={childRoutes}>
        <IndexRoute component={Start} />
      </Route>
      <Route path="*" component={NoMatch} />
    </Route>
  );
};
