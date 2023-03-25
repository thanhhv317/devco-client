import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class PostItem extends Component {
  render() {
    const { post } = this.props;
    const tagName = post.tags.map(p => p.name).join(", ")
    return (
      <div className="row col-12">
        <div className="post-preview">
          <Link to={`/post/${post.slug}.${post.id}`}>
            <h2 className="post-title">{post.title}</h2>
          </Link>
          <p className="post-meta">
            {moment(post.createdAt).format("hh:mm DD/MM/YYYY")}
            &nbsp; - <b> {tagName} </b>
          </p>
        </div>
        {/* <hr /> */}
      </div>
    );
  }
}

export default PostItem;
