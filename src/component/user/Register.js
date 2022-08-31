import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./user.css";
import { Button, Link, Stack } from "@chakra-ui/react";
import Header from "./Header";
toast.configure();

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    const requestData = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    axios
      .post(`http://localhost:5000/api/register`, requestData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Account created successfully.");
          setTimeout(() => {
            window.location = "/login";
          }, 2000);
        } else {
          toast.warn("Something went wrong..");
        }
      });
    e.preventDefault();
  };
  const handleClick = () => {
    toast.warn("All field are required*.");
  };

  return (
    <>
      <Header />

      <div id="login-box">
        <div className="left">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone "
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {name === "" || email === "" || phone === "" || password === "" ? (
              <Stack direction="row" spacing={4} align="center">
                <Button
                  // disabled
                  colorScheme="teal"
                  className="btncolreg"
                  size="sm"
                  onClick={handleClick}
                >
                  Sign up
                </Button>
              </Stack>
            ) : (
              <input
                type="submit"
                name="signup_submit"
                className="colLogin"
                value="Sign up"
              />
            )}
          </form>{" "}
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Stack direction="row" spacing={4} align="center">
              <Button colorScheme="teal" className="btncol" size="sm">
                Login
              </Button>
            </Stack>
          </Link>
        </div>

        <div className="right">
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

export default SignUp;
