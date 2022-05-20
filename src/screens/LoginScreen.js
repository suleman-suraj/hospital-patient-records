import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UsersContext } from "../context/UsersContext";
import { Link } from "react-router-dom";
import hospital from "../image/hospital.jfif";

import { BiUser } from "react-icons/bi";

const LoginScreen = ({ history, location }) => {
  const { loginUser, userInfo } = useContext(UsersContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    loginUser(user);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${hospital})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          justifyContent: "center",
          alignItems: "center",
          gridGap: 20,
          padding: "20px",
          border: "1px solid white",
        }}>
        <h1 className="text-center">LOG IN</h1>
        <BiUser size={65} style={{ border: "2px solid black" }} />
        <Form.Control
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">
          <Link to="/">LOGIN</Link>
        </Button>
        <h5>
          Create new account <Link to="/register"> Sign Up</Link>
        </h5>
      </Form>
    </div>
  );
};
export default LoginScreen;
