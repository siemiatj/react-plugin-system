// import { createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose } from 'redux';
import { createStore } from 'redux-dynamic-reducer';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers';

// const addPromiseSupportToDispatch = (store) => {
//   const rawDispatch = store.dispatch;
//   return (action) => {
//     if (typeof action.then === 'function') {
//       return action.then(rawDispatch);
//     }
//     return rawDispatch;
//   };
// };

// const addLoggingToDispatch = (store) => {
//   /* eslint-disable no-console */
//   const rawDispatch = store.dispatch;
//   if (!console.group) {
//     return rawDispatch;
//   }

//   return (action) => {
//     console.group(action.type);
//     console.log('%c prev state', 'color: gray', store.getState());
//     console.log('%c action', 'color: blue', action);
//     const returnValue = rawDispatch(action);
//     console.log('%c next state', 'color: green', store.getState());
//     console.groupEnd(action.type);
//     return returnValue;
//   };
//   /* eslint-enable no-console */
// };

export default function configureStore(history) {
  const middleware = [thunk, promiseMiddleware, routerMiddleware(history)];
  const store = createStore(
    null,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  store.attachReducers(rootReducer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

// const configureStore = () => {
//   const store = createStore(todoApp);

//   if (process.env.NODE_ENV !== 'production') {
//     store.dispatch = addLoggingToDispatch(store);
//   }

//   // store.dispatch = addPromiseSupportToDispatch(store);

//   return store;
// };

// export default configureStore;
