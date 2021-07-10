import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Navbar expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="/">
              <img
                src="../static/images/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Twitter Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="header-nav" />
            <Navbar.Collapse id="header-nav">
              <Nav className="mr-auto">
                <Nav.Item>
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/">Explore</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/">Messages</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/">Notifications</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/profile">Your Profile</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Container>
    );
  }
}
