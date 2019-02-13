import React from 'react';
import { IndexRoute, NoMatch, Route } from 'react-router';
// import { push } from 'react-router-redux';

// import Board from './containers/Board.js';
import Dashboard from './containers/Dashboard.js';

// import MasterWindow from './containers/MasterWindow.js';
import NavigationTree from './containers/NavigationTree.js';
import PluginContainer, { pluginWrapper } from './components/PluginContainer';

export const getRoutes = (store, plugins) => {
  // function setPluginBreadcrumbHandlers(routesArray, currentBreadcrumb) {
  //   routesArray.forEach(route => {
  //     const routeBreadcrumb = [
  //       ...currentBreadcrumb,
  //       {
  //         caption: route.breadcrumb.caption,
  //         type: route.breadcrumb.type,
  //       },
  //     ];

  //     // route.onEnter = () => store.dispatch(setBreadcrumb(routeBreadcrumb));

  //     if (route.childRoutes) {
  //       setPluginBreadcrumbHandlers(route.childRoutes, routeBreadcrumb);
  //     }
  //   });
  // }

  const getPluginsRoutes = plugins => {
    if (plugins.length) {
      const routes = plugins.map(plugin => {
        if (plugin.routes && plugin.routes.length) {
          const pluginRoutes = [...plugin.routes];
          const ParentComponent = pluginRoutes[0].component;

          // wrap main plugin component in a HOC that'll render it
          // inside the app using a Container element
          if (ParentComponent.name !== 'WrappedPlugin') {
            const wrapped = pluginWrapper(PluginContainer, ParentComponent);

            pluginRoutes[0].component = wrapped;

            // if (pluginRoutes[0].breadcrumb) {
            //   setPluginBreadcrumbHandlers(pluginRoutes, []);
            // }
          }

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
      path: '/window/:windowType',
      component: nextState => (
        <DocList
          query={nextState.location.query}
          windowType={nextState.params.windowType}
        />
      ),
    },
    // {
    //   path: '/window/:windowType/:docId',
    //   component: MasterWindow,
    //   onEnter: ({ params }) =>
    //     store.dispatch(createWindow(params.windowType, params.docId)),
    // },
    {
      path: '/sitemap',
      component: NavigationTree,
    },
    ...pluginRoutes,
  ];

  return (
    <Route path="/">
      <Route childRoutes={childRoutes}>
        <IndexRoute component={Dashboard} />
      </Route>
      <Route path="*" component={NoMatch} />
    </Route>
  );
};
