import React, { Component } from "react";
import Item from "./Item";
import { domain } from "../../../utils/config";

class ListComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      items: [],
    };
  }

  componentDidMount() {
    const { postId } = this.props;
    const url = domain + `comments/list_by_post_id?id=${postId}`;
    const fetchData = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data.comments,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                Error: {error.message}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">Loading...</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <article>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12 mx-auto">
                  <div className="post-comments">
                    {items.map((item, index) => {
                      return <Item item={item} key={index}/>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      );
    }
  }
}

export default ListComment;
