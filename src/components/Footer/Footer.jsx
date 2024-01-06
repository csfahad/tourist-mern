import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const quick__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick__links2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <h3>Tourist ✈️</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                corporis. Voluptas, dolores.
              </p>

              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="https://github.com/csfahad" target="_blank">
                    <i class="ri-github-fill"></i>
                  </Link>
                </span>

                <span>
                  <Link
                    to="https://www.linkedin.com/in/csfahad/"
                    target="_blank"
                  >
                    <i class="ri-linkedin-fill"></i>
                  </Link>
                </span>

                <span>
                  <Link to="https://twitter.com/fahad_cs" target="_blank">
                    <i class="ri-twitter-x-fill"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title ">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quick__links?.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {quick__links2?.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 mb-0 d-flex align-items-center gap-2>
                  <span>
                    <i class="ri-code-s-slash-fill"></i>
                  </span>
                  Portfolio:
                </h6>
                <p className="mb-0">
                  <Link
                    to="https://csfahad-portfolio.vercel.app"
                    target="_blank"
                  >
                    Click here<i class="ri-arrow-right-up-line"></i>
                  </Link>
                </p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 mb-0 d-flex align-items-center gap-2>
                  <span>
                    <i class="ri-map-pin-line"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0">New Delhi, India</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="copyright">
              Design & Developed by{" "}
              <a href="https://linkedin.com/in/csfahad" target="_blank">
                Cs Fahad
              </a>
              . All rights reserved. Copyright © {year}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
