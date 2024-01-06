import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "./../utils/config";

import "../styles/Login.css";
import NewsLetter from "../shared/NewsLetter";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message);
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div className="login__img">
                  <img src={loginImg} alt="" />
                </div>

                <div className="login__form">
                  <div className="user">
                    <img src={userIcon} alt="" />
                  </div>
                  <h2>Sign-in</h2>

                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        id="email"
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        id="password"
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <Button
                      className="btn secondary_btn auth__btn"
                      type="submit"
                    >
                      Sign in
                    </Button>
                  </Form>
                  <p>
                    Don&apos;t have an account?{" "}
                    <Link to="/register">Create one </Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <NewsLetter />
    </>
  );
};

export default Login;
