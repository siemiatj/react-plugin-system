import { routerReducer as routing } from 'react-router-redux';

import pluginsHandler from './pluginsHandler';
import todos, * as fromTodos from './todos';

export default {
  todos,
  pluginsHandler,
  routing,
};

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
