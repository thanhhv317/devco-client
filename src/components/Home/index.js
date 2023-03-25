import React, { Component } from "react";
import PostItem from "./../PostItem";
import { domain } from "../../utils/config";
import _ from "lodash";
import { Link } from "react-router-dom";

const limit = 20;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      isLoadmore: true,
      cursor: "",
    };
  }

  LoadMore = () => {
    const { cursor } = this.state;
    const url = domain + `api/posts?limit=${limit}&cursor=${cursor}`;
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
          if (!result.data) {
            this.setState({
              isLoaded: true,
              error: result.data,
            });
          } else {
            let tmp = this.state.items;
            const nextCursor = result.paging.next_cursor;
            this.setState({
              cursor: nextCursor,
              isLoaded: true,
              items: [...tmp, ...result.data],
            });
            const isLoadmore =
              result.data.length < limit || nextCursor === "" ? false : true;

            this.setState({
              isLoadmore,
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
    const url = domain + `api/posts?limit=${limit}`;
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
          console.log(result);
          if (!result.data) {
            this.setState({
              error: result.data,
            });
          } else {
            const paging = result.paging;
            const { next_cursor: nextCursor } = paging;
            const isLoadmore =
              result.data.length < limit || nextCursor === "" ? false : true;

            this.setState({
              isLoaded: true,
              items: result.data,
              isLoadmore,
              cursor: nextCursor,
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
                  return <PostItem key={item.id} post={item} />;
                })}
                {/* Pager */}

                {isLoadmore ? (
                  <div className="clearfix">
                    <Link
                      to={"#"}
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
