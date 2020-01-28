import { connectRouter } from 'connected-react-router';

import pluginsHandler from './pluginsHandler';
import todos, * as fromTodos from './todos';

export const createRootReducer = (history) => ({
  router: connectRouter(history),
  todos,
  pluginsHandler,
})

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
