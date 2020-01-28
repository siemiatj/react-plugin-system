import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Container>
    <h1>404 not found</h1>
    <Link to={"/"}>Bring me back to the start</Link>
  </Container>
);

export default NotFound;
