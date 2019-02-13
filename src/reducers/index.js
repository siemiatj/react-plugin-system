import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import pluginsHandler from './pluginsHandler';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos,
  pluginsHandler,
  routing,
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
