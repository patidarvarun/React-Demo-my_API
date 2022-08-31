import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./user.css";
import { Button, Link, Stack } from "@chakra-ui/react";
import Header from "./Header";
toast.configure();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      email: email,
      password: password,
    };
    axios.post(`http://localhost:5000/api/login`, requestData).then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("id", res.data._id);
        localStorage.setItem("role", res.data.role);
        if (res.data.role === "user") {
          toast.success("Login Successfully");
          setTimeout(() => {
            window.location = "/";
          }, 1000);
        } else {
          toast.warn("Bad Credential..");
        }
      } else {
        toast.error("Bad Credential..");
      }
    });
  };

  const handleClick = () => {
    toast.warn("All field are required*.");
  };
  return (
    <>
      <Header />
      <div id="login-box">
        <div className="left">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {email === "" || password === "" ? (
              <Stack direction="row" spacing={4} align="center">
                <Button
                  // disabled
                  colorScheme="teal"
                  className="btncolreg1"
                  size="sm"
                  onClick={handleClick}
                >
                  Login
                </Button>
              </Stack>
            ) : (
              <input
                type="submit"
                className="colLogin"
                name="signup_submit"
                value="Login"
              />
            )}
          </form>{" "}
          <Link href="/register" style={{ textDecoration: "none" }}>
            <Stack direction="row" spacing={4} align="center">
              <Button colorScheme="teal" className="btncol" size="sm">
                Sign Up
              </Button>
            </Stack>
          </Link>
        </div>

        <div className="right1">
          <span className="loginwith">
            Sign in with
            <br />
            social network
          </span>

          <button className="social-signin facebook">
            Log in with facebook
          </button>
          <button className="social-signin twitter">Log in with Twitter</button>
          <button className="social-signin google">Log in with Google+</button>
        </div>
        <div className="or">OR</div>
      </div>
    </>
  );
};

export default Login;
