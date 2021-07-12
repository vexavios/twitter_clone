import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "",
      postContent: "",
      allPostIDs: [],
      allPostAuthors: [],
      allPostContents: [],
      allPostCreationDates: [],
    };

    this.handleAuthor = this.handleAuthor.bind(this);
    this.handlePostContent = this.handlePostContent.bind(this);
    this.handlePostButtonPressed = this.handlePostButtonPressed.bind(this);
    this.getPostDetails();
  }

  handleAuthor(e) {
    this.setState({
      author: e.target.value,
    });
  }

  handlePostContent(e) {
    this.setState({
      postContent: e.target.value,
    });
  }

  handlePostButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: this.state.author,
        post_content: this.state.postContent,
      }),
    };

    fetch("/api/create-post", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/post/" + data.id));
  }

  getPostDetails() {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        // get all post information and save in state
        data.forEach((post) => {
          this.setState((prevState) => ({
            allPostIDs: [...prevState.allPostIDs, post.id],
            allPostAuthors: [...prevState.allPostAuthors, post.author],
            allPostContents: [...prevState.allPostContents, post.post_content],
            allPostCreationDates: [
              ...prevState.allPostCreationDates,
              post.created_at,
            ],
          }));
        });
      });
  }

  render() {
    const allPosts = [];

    // save all posts as html to render
    for (let i = this.state.allPostIDs.length - 1; i >= 0; i--) {
      allPosts.push(
        <Container>
          <Row>
            <Col>
              <br />
              <Card>
                <Card.Body>
                  <Card.Title>{this.state.allPostAuthors[i]}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Created at {this.state.allPostCreationDates[i]}
                  </Card.Subtitle>
                  <Card.Text>{this.state.allPostContents[i]}</Card.Text>
                  <Card.Link href={`/post/${this.state.allPostIDs[i]}`}>
                    View Post Page
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>New Post</Card.Title>
                  <Form>
                    <Card.Text>
                      <Form.Group className="mb-3" controlId="author">
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          maxLength="50"
                          placeholder="Who are you?"
                          onChange={this.handleAuthor}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="postContent">
                        <Form.Control
                          as="textarea"
                          autoComplete="off"
                          rows={3}
                          maxLength="140"
                          placeholder="What's on your mind?"
                          onChange={this.handlePostContent}
                        />
                      </Form.Group>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={this.handlePostButtonPressed}
                    >
                      Post!
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <br />
        {allPosts}
        <br />
      </div>
    );
  }
}
