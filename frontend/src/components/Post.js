import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      postContent: "",
      createdAt: "",
    };

    this.postID = this.props.match.params.postID;
    this.getPostDetails();
  }

  getPostDetails() {
    fetch("/api/get-post" + "?id=" + this.postID)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          author: data.author,
          postContent: data.post_content,
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
                  <Card.Title>{this.state.author}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Created at {this.state.createdAt}
                  </Card.Subtitle>
                  <Card.Text>{this.state.postContent}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
