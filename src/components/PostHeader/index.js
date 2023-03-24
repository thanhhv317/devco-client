import React, { Component } from "react";
import moment from "moment";
import { domain } from "../../utils/config";

class PostHeader extends Component {
  render() {
    const { author, title, createDate, image } = this.props;
    const thumbnail = domain + image;
    return (
      <div>
        <header
          className="masthead"
          style={{backgroundImage: "url(" + thumbnail + ")"}}
        //   style={{ backgroundImage: 'url("../assets/img/post-bg.jpg")' }}
        >
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 mx-auto">
                <div className="post-heading">
                  <h1>{title}</h1>
                  <span className="meta">
                    Đăng bởi
                    <b style={{ cursor: "pointer" }}> {author} </b>
                    lúc {moment(createDate).format("hh:mm - DD/MM/YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default PostHeader;
