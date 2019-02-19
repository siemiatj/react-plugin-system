# Plugin system for ReactJS apps with Redux datalayer

Although plugin systems are usually custom and application-specific it's nice to have some inspiration. When I had to build one I was having trouble finding anything that worked/looked clean/was easily extendable. So here's my take on this problem.

## Requirements

This is a pretty simple extension to your typical React application. What you'll need is :
* ReactJS 16+
* Redux 3+
* react-router 3.x

## Contents of this repository

The structure of this repo can be divided into two separate parts:

#### Essentials

* webpack.config.js.dist - starter development webpack config
* webpack.prod.js.dist - starter production webpack config
* plugins.dist.js - config file for loading plugins
* .babelrc - minimal Babel config to load plugins properly
* src/ - javascript to start building your app. Needs to be extended.
  * actions/PluginActions.js - plugin-specific action-creators
  * components/App.js - wrapper around redux's Provider and react-router Routes (which is basically the root of the app - just render it to an html element) that loads plugins from config on init
  * components/CustomRouter.js - wrapper around react-router's Routes component that extends it's functionality 
  * reducers/index.js - merges reducers
  * reducers/pluginsHandler.js - redux reducer responsible for storing plugins info in the store
  * services/PluginsRegistry.js - stores info about loaded plugins
  * configureStore.js - initialize redux store
  * routes.js - define your react-router routes here + load plugin routes

#### Examples

Complete applications showing how to integrate plugins to achieve certain results:

* basic - application that loads another (almost) separate application using a plugin. This is just to focus on the most basic boilerplate to get you started without the apps really communicating between themselves. 
* (in the works) advanced -  a more complex application that extends it's basic functionality with plugin
* (planned) multiple plugins example

# Howto

This part describes the requirements and process of creating and loading a custom plugin.

## Loading plugins in the application

All plugins are dynamically loaded on application start from separate script files. In order to pickup new plugins, user must :

1. Provide a plugins.js file, that will be loaded by the app. If file does not exist it can be created by copying the default config:

> cp plugins.js.dist plugins.js

or in case of production build:

> cp plugins.js.dist ./dist/plugins.js

2. Add plugins names to the array inside the config, ie :

```javascript
//plugins.js

module.exports = {
  PLUGINS: [],
};;
```

3. Copy your plugins scripts to folders named after values inserted in the config array and placed in the main plugins folder. Mind scripts are expected to have `index.js` name.

> cp index.js ./plugins/plugin1/
> cp index.js ./plugins/plugin2/

4. Build the application

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

# Building custom plugins

Since the plugins are imported as separate modules, they must be built in such a way that dynamic commonjs imports will work. Here's a short guide on how to configure [Webpack](https://webpack.js.org/) bundler with [Babel](https://babeljs.io/) precompiler in production mode (right now code minification is not supported for the plugins).


## Build configuration

For the purpose of this guide we will be using configurations as required by Babel 6.20.x and Webpack 4.7.x .

### Babel

To compile javascript using Babel compiler you will need two plugins : `babel-plugin-add-module-exports` and `babel-plugin-syntax-dynamic-import`. Both can be installed via yarn or npm :

> npm install --save-dev babel-plugin-add-module-exports babel-plugin-syntax-dynamic-import

and then added to the `.babelrc` config file:

```javascript
{
  "plugins": [
    "add-module-exports",
    "babel-plugin-syntax-dynamic-import",
  ]
}
```

### Webpack

This is a basic config for Webpack. One important thing to notice is the `libraryTarget` option for the output code.

```javascript
var path = require('path');

module.exports = {
    mode: 'production',
    entry: [
        './index.jsx'
    ],
    optimization: {
        minimize: false,
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: path.join(__dirname, 'src')
        },
    ]},
    resolve: {
        extensions: ['.js', '.json']
    }
};
```

## Plugin architecture basics

This section describes how the plugins code should be structured, available options, handling data etc.

### API

Plugins need to provide a certain API to properly work with the application. This is a sample module code we will use to describe each of the options.

```javascript
const api = {
  routes: [
    {
      path: '/myplugin',
      component: Main,
      // optional
      indexRoute: {
        component: IndexComponent,
      },
      childRoutes: [
        {
          path: '/myplugin/child-route',
          component: ChildComponent,
        },
      ],
    },
  ],
  reducers: {
    name: 'myplugin',
    reducer,
  },
};
```

**routes**

Right now this system supports `react-router` (v3) for routing, which plugins can further extend. This option expects an array of [static routes](https://reacttraining.com/react-router/core/guides/philosophy/static-routing), which support all of the functionality provided by `react-router`. Nested child routes require a full path, with parent's prefix, ie `/myparent/child`.

**reducers**

This setting is used for extending the parent application's [redux](https://redux.js.org/) reducer. All plugins reducers will be branched on the main reducer tree under `plugins` key. It expects an object with two keys:
* name - reducer name
* reducer - reducer function

### Data handling

Data layer is powered by the well respected [redux](https://redux.js.org/) store. This stays true for the plugins, as the main plugins component is wrapped in the redux's Provider (wich gives access to the store). Please check the official [guide](https://redux.js.org/basics/usage-with-react) for details on how to connect components with the store. Here's a minimal example showing how to provide user's id to your component's props:

```javascript
class MyComponent extends Component {
}

function mapStateToProps({ plugins }) {
  return {
    userId: plugins[pluginName].userId,
  };
}

export default connect(mapStateToProps)(MyComponent);
```

For simplicity (or in case of using functional components) there are two additional properties available:
* store - handler for the redux store
* dispatch - store's function for dispatching actions

Remember about the fact, that plugin's are added to the redux tree under `plugins` key. So any data query should be prepended with `plugins` followed by the plugin name.

## Learn More
