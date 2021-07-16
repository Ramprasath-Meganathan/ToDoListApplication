import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import "../../css/NotFound.css";
import Image from "react-bootstrap/Image";

export default class NotFound extends Component {
  render() {
    return (
      <section className="container">
        <article className="NotFound">
          <Image
            src="https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln"
            fluid
            alt="NotFound"
          />
          <h1>Sorry, page not found!</h1>
          <Col style={{ textAlign: "center" }}>
            <a href="/">
              <Button type="submit" size="lg" color="primary">
                Take Me Home
              </Button>
            </a>
          </Col>
        </article>
      </section>
    );
  }
}
