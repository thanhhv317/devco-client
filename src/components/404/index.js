import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class PageNotFound extends Component {
  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <div />
            <h1>404</h1>
          </div>
          <h2>Không tìm thấy trang</h2>
          <p>
            Trang bạn đang tìm kiếm có thể đã bị xóa có tên là đã thay đổi hoặc
            tạm thời không có sẵn.
          </p>
          <Link to="/">Trang chủ</Link>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
