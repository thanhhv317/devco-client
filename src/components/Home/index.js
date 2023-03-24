import React, { Component } from "react";
import PostItem from "./../PostItem";
import { domain } from "../../utils/config";
import _ from "lodash";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      error: null,
      isLoaded: false,
      items: [],
      isLoadmore: true,
    };
  }

  LoadMore = () => {
    const { page } = this.state;
    const url = domain + `posts/client/list?page=${page + 1}`;
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
          if (result.status) {
            let tmp = this.state.items;
            this.setState({
              page: this.state.page + 1,
              isLoaded: true,
              items: [...tmp, ...result.data.posts],
            });
            if (_.isEmpty(result.data.posts)) {
              this.setState({
                isLoadmore: false,
              });
            }
          } else {
            this.setState({
              isLoaded: true,
              error: result.data,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  componentDidMount() {
    const url = domain + "posts/client/list";
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
          if (result.status) {
            let tmp = result.data.posts.length > 20 ? true: false;
            this.setState({
              isLoaded: true,
              items: result.data.posts,
              isLoadmore: tmp
            });
          } else {
            this.setState({
              error: result.data,
            });
          }
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items, isLoadmore } = this.state;
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
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 mx-auto">
                {items.map((item) => {
                  return <PostItem key={item._id} post={item} />;
                })}
                {/* Pager */}

                {isLoadmore ? (
                  <div className="clearfix">
                    <Link
                      className="btn btn-primary float-right"
                      style={{ cursor: "pointer" }}
                      onClick={this.LoadMore}
                    >
                      Xem thêm →
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
