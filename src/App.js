import React from 'react';
//import './App.css';
import LoginScreen from "./screens/LoginScreen";
import RegisterUserScreen from "./screens/RegisterUserScreen";
import { Route, Redirect } from "react-router-dom";

import Header from'./components/Header';
//import Home from'./components/Home';
import Footer from'./components/Footer';

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  let user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="">
      <Header />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;