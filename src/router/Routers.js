import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { history } from "../common/history";
import Category from "../component/user/Category";
import Home from "../component/user/Home";
import Login from "../component/user/Login";
import Register from "../component/user/Register";
import ProductPage from "../component/user/ProductPage";
import ProductDetails from "../component/user/ProductDetails";
import Logout from "../component/user/Logout";
import Cart from "../component/user/Cart";
import About from "../component/user/About";
import Contact from "../component/user/Contact";

class Routers extends Component {
  state = {
    // token: localStorage.getItem("data"),
    // role: localStorage.getItem("role"),
  };

  render() {
    return (
      <>
        <Routes>
          <Route history={history} exact path="/" element={<Home />} />
          <Route history={history} exact path="/login" element={<Login />} />
          <Route
            history={history}
            exact
            path="/register"
            element={<Register />}
          />
          <Route
            history={history}
            exact
            path="/category"
            element={<Category />}
          />
          <Route
            history={history}
            exact
            path="/productPage"
            element={<ProductPage />}
          />
          <Route
            history={history}
            exact
            path="/productDetails"
            element={<ProductDetails />}
          />
          <Route history={history} exact path="/cart" element={<Cart />} />
          <Route history={history} exact path="/logout" element={<Logout />} />

          <Route history={history} exact path="/about" element={<About />} />
          <Route
            history={history}
            exact
            path="/contact"
            element={<Contact />}
          />
        </Routes>
      </>
    );
  }
}

export default Routers;
