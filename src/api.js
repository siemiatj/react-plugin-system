import uuid from 'uuid/v4';

// This is a fake in-memory implementation of something
// that would be implemented by calling REST server.

const fakeDatabase = {
  todos: [
    {
      id: uuid(),
      text: 'hey',
      completed: true,
    },
    {
      id: uuid(),
      text: 'ho',
      completed: true,
    },
    {
      id: uuid(),
      text: 'let’s go',
      completed: false,
    },
  ],
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });
