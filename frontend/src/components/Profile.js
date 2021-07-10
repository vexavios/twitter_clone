import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Alert variant="info">
                Your profile page! <b>(Under Construction)</b>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
