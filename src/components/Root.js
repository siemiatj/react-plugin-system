// import React from 'react';
// import { Provider } from 'react-redux';
// import { Router, Route, browserHistory } from 'react-router';
// import App from './App';

// const Root = ({ store }) => (
//   <Provider store={store}>
//     <Router history={browserHistory}>
//       <Route path="/(:filter)" component={App} />
//     </Router>
//   </Provider>
// );

// export default Root;

import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
