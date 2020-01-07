import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose } from 'redux';
import { createStore } from 'redux-dynamic-reducer';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createRootReducer } from './reducers';

export default function configureStore(history) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleware = [thunk, promiseMiddleware, routerMiddleware(history)];
  const store = createStore(
    null,
    composeEnhancer(
      applyMiddleware(...middleware),
    )
  );

  store.attachReducers(createRootReducer(history));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = createRootReducer(history);
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
