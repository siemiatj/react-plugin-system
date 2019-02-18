import { applyMiddleware, compose } from 'redux';
import { createStore } from 'redux-dynamic-reducer';

export default function configureStore(history) {
  // your middlewares
  const middleware = [];
  const store = createStore(
    // store is initialized without state
    null,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  // attach reducers to your empty store
  store.attachReducers(rootReducer);

  // optional hot-reload
  /*
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }
  */

  return store;
}
