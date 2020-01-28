import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const Todos = () => {
  let { filter } = useParams();
  if (typeof filter === 'undefined') {
    filter = 'all';
  }
  return (
    <div className="container dashboard">
      <div className="row">
        <div className="col-12">
          <Navbar bg="light" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Item>
                  <LinkContainer to={{ pathname: '/todos' }}>
                    <Nav.Link>Todos</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to={{ pathname: '/plugins' }}>
                    <Nav.Link>Plugins</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <AddTodo />
          <VisibleTodoList filter={filter} />
          <Footer />
        </div>
      </div>
    </div>
  )
};

export default Todos;
