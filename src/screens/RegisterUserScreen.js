import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Col, Form, Button, Row } from "react-bootstrap";
import { UsersContext } from "../context/UsersContext";
import hospital from "../image/hospital.jfif";

const RegisterUserScreen = () => {
  const history = useHistory();
  const location = useLocation();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");

  const { registerUser, userInfo } = useContext(UsersContext);

  const redirect = location.search ? location.search.split("=")[1] : "/home";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  function handleSubmit(e) {
    e.preventDefault();
    const newuser = {
      firstname,
      lastname,
      birthdate,
      email,
      phone,
      password,
      profession,
    };
    registerUser(newuser);
  }
  return (
    <div
      style={{
        backgroundImage: `url(${hospital})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "110vh",
        width: "100%",
        alignItems: "center",
        gridTemplateColumns: "90%",
        justifyContent: "center",
        display: "grid",
      }}>
      <Row className="justify-content-md-center">
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className="justify-center border border-white mt-5 p-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <h1 className="text-center">SIGN UP</h1>
              <Form.Label>First Name </Form.Label>
              <Form.Control
                placeholder="Enter First Name"
                value={firstname}
                onChange={(text) => setFirstName(text.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name </Form.Label>
              <Form.Control
                placeholder="Enter Last Name"
                value={lastname}
                onChange={(text) => setLastName(text.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Birth Date </Form.Label>
              <Form.Control
                placeholder="Enter Birth Date"
                value={birthdate}
                onChange={(date) => setBirthDate(date.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone </Form.Label>
              <Form.Control
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(text) => setPhone(text.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter Email </Form.Label>
              <Form.Control
                placeholder="Enter Email"
                value={email}
                onChange={(text) => setEmail(text.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Password </Form.Label>
              <Form.Control
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(text) => setPassword(text.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Profession </Form.Label>
              <Form.Control
                placeholder="Enter Profession"
                value={profession}
                onChange={(text) => setProfession(text.target.value)}
              />
            </Form.Group>
            <Button type="submit">
              <Link to="/">SIGN UP</Link>
            </Button>
            <h5>
              Already a User? <Link to="/login">Login</Link>
            </h5>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterUserScreen;
