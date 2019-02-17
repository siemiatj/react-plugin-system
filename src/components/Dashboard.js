import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Dashboard = ({ children }) => (
  <div className="container dashboard">
    <div className="row">
      <div className="col-12">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <LinkContainer to={{ pathname: '/' }}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <LinkContainer to={{ pathname: '/todos' }}>
                  <Nav.Link>Todos</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
    <div className="row">
      <div className="col-12">{children}</div>
    </div>
  </div>
);

export default Dashboard;
