import uuid from 'uuid/v4';
import * as api from '../api';

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

export const fetchTodos = filter =>
  api.fetchTodos(filter).then(response => receiveTodos(filter, response));

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: uuid(),
  text,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});
