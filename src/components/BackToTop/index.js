import React, { Component } from "react";
import { Link } from "react-router-dom";

class BackToTop extends Component {
  render() {
    return (
      <Link to="#" id="button">
        <i className="fa fa-angle-up"></i>
      </Link>
    );
  }
}

export default BackToTop;
