import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLoginButtonPressed = this.handleLoginButtonPressed.bind(this);
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLoginButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };

    fetch("/api/login", requestOptions)
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
                  <Card.Title>Login to your Twitter account</Card.Title>
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
                      onClick={this.handleLoginButtonPressed}
                    >
                      Login
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
