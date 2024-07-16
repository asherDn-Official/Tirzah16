import React from "react";
//import { useState } from "react";
import { Outlet } from "react-router-dom";
//import {  useNavigate } from "react-router-dom";
import Login from "..//../Components/LoginPage";

const AuthUser = () => {
  //const Navigate = useNavigate();
  const email = localStorage.getItem("EmailInput");
  const password = localStorage.getItem("PasswordInput");

  if (email === "tirzah@gmail.com" && password === "1234") {
    const user = { login: true };
    return user && user.login;
    //Navigate(`/edit/home`);
  } else {
    const user = { login: false };
    return user && user.login;
  }
};

const Protect = () => {
  const isAuth = AuthUser();
  return isAuth ? <Outlet /> : <Login />;
};

export default Protect;
