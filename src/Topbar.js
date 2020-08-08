import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Container } from 'react-bootstrap';
import history from './history';

function Topbar() {
  return (
    <Navbar bg="none" variant="dark" className="navbar-expand-md" >
      <Container>
        <Navbar.Brand onClick={() => history.push('/')}>
          <img
            alt=""
            src="/assets/img/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top mx-1"
        />{' '}
          KUBE ME
        </Navbar.Brand>
        <Nav></Nav>
        <Button variant="dark" onClick={() => history.push('/Kuber')}>START KUBING</Button>
      </Container>
    </Navbar>
  );
}

export default Topbar;
