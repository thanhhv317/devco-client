import React, { Component } from "react";
import moment from "moment";

class Item extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="media">
        <div className="media-left">
          <img
            className="media-object"
            src="http://bloght.herokuapp.com/homepages/img/avatar.png"
            alt=""
          />
        </div>
        <div className="media-body">
          <div className="media-heading">
            <div className="user-comment">{item.name}</div>
            <span className="time">{moment(item.createdAt).format('hh:mm - MM/DD/YYYY')}</span>
          </div>
          <div className="content-comment">{item.comment}</div>
        </div>
      </div>
    );
  }
}

export default Item;
