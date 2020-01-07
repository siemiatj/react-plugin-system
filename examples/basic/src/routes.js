import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Todos from './components/Todos';
import NotFound from './components/NotFound';

export const getRoutes = (store, plugins) => {
  if (plugins.length < 1) {
    return [];
  }

  let pluginRoutes = [];
  plugins.map(plugin => {
    if (typeof plugin.routes === 'undefined') {
      return;
    }

    pluginRoutes.push(plugin.routes);
  });
  console.log(pluginRoutes);

  let result = (
    <Switch>
      <Route path="/todos/:filter?" component={Todos} />
      <Route exact path="/" component={Dashboard} />

      {pluginRoutes}

      <Route component={NotFound} />
    </Switch>
  );

  console.log(result);

  return result;
};
