import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      createdAt: "",
    };

    this.userID = this.props.match.params.userID;
    this.getUserDetails();
  }

  getUserDetails() {
    fetch("/api/get-user" + "?id=" + this.userID)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          username: data.username,
          createdAt: data.created_at,
        });
      });
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{this.state.username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Joined at {this.state.createdAt}
                  </Card.Subtitle>
                  <Card.Text>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
