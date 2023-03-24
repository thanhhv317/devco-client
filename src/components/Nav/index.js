import React, { Component } from "react";
import {
  NavLink,
  Link
} from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="mainNav"
        >
          <div className="container">
            <Link className="navbar-brand" to="/">
              BlogHT
            </Link>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              Menu
              <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Trang chủ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/category">
                    Thể loại
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About me
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
