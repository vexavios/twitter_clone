import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRegisterButtonPressed =
      this.handleRegisterButtonPressed.bind(this);
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegisterButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    };

    fetch("/api/register", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push(""));
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Register a Twitter account</Card.Title>
                  <Form>
                    <Card.Text>
                      <Form.Group className="mb-3" controlId="username">
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          maxLength="50"
                          placeholder="Username"
                          onChange={this.handleUsername}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Control
                          type="email"
                          autoComplete="off"
                          maxLength="50"
                          placeholder="Email"
                          onChange={this.handleEmail}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Control
                          type="password"
                          autoComplete="off"
                          maxLength="50"
                          placeholder="Password"
                          onChange={this.handlePassword}
                        />
                      </Form.Group>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={this.handleRegisterButtonPressed}
                    >
                      Register
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
