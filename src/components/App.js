import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// import '../assets/css/styles.css';
import { addPlugins } from '../actions/PluginActions';
import PluginsRegistry from '../services/PluginsRegistry';
import CustomRouter from './CustomRouter';
import configureStore from '../store/configureStore';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
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
        const waitForChunk = () =>
          import(`@plugins/${plugin}/index.js`)
            .then(module => module)
            .catch(() => {
              // eslint-disable-next-line no-console
              console.error(`Error loading plugin ${plugin}`);
            });

        return new Promise(resolve =>
          waitForChunk().then(file => {
            this.pluginsRegistry.addEntry(plugin, file);
            resolve({ name: plugin, file });
          })
        );
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
        <CustomRouter store={store} history={history} />
      </Provider>
    );
  }
}
