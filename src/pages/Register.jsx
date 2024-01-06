import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "./../utils/config";

import "../styles/Login.css";
import NewsLetter from "../shared/NewsLetter";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
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

    try {
      const res = await fetch(`${BASE_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message);
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
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
                  <img src={registerImg} alt="" />
                </div>

                <div className="login__form">
                  <div className="user">
                    <img src={userIcon} alt="" />
                  </div>
                  <h2>Register</h2>

                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Full name"
                        required
                        id="username"
                        onChange={handleChange}
                      />
                    </FormGroup>

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
                      Create account
                    </Button>
                  </Form>
                  <p>
                    Already have an account? <Link to="/login">Login </Link>
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

export default Register;
