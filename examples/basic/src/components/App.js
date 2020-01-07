import '../assets/scss/styles.scss';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import { addPlugins } from '../actions/PluginActions';
import PluginsRegistry from '../services/PluginsRegistry';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from '../configureStore';
import { getRoutes } from '../routes';

const history = createBrowserHistory();

const store = configureStore(history);
const APP_PLUGINS = PLUGINS ? PLUGINS : [];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pluginsLoading: !!APP_PLUGINS.length,
    };

    this.pluginsRegistry = new PluginsRegistry(this);
    window.META_HOST_APP = this;

    if (APP_PLUGINS.length) {
      const plugins = APP_PLUGINS.map(plugin => {
        const waitForChunk = () => {
          return import(`@plugins/${plugin}/index.js`)
            .then(module => module);
        }

        return new Promise(resolve =>
          waitForChunk().then(file => {
            this.pluginsRegistry.addEntry(plugin, file);
            resolve({ name: plugin, file });
          })
        ).catch((e) => {
          // eslint-disable-next-line no-console
          console.error(`Error loading plugin "${plugin}": ${e}`);
        });
      });

      Promise.all(plugins).then(res => {
        const plugins = res.reduce((prev, current) => prev.concat(current), []);

        if (plugins.length) {
          store.dispatch(addPlugins(plugins));
        }

        plugins.forEach(({ file }) => {
          if (file.reducers && file.reducers.name) {
            store.attachReducers({
              plugins: {
                [`${file.reducers.name}`]: file.reducers.reducer,
              },
            });
          }
        });

        this.setState({
          pluginsLoading: false,
        });
      });
    }
  }

  getRegistry() {
    return this.pluginsRegistry;
  }

  render() {
    if (APP_PLUGINS.length && this.state.pluginsLoading) {
      return null;
    }

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {getRoutes(store, store.getState().pluginsHandler.files)}
        </ConnectedRouter>
      </Provider>
    );
  }
}
