import React, { Component } from "react";
import { domain } from "../../../utils/config";
import PostItem from "../../PostItem";
import Header from "../../Header";
import _ from "lodash";
import { Link } from "react-router-dom";

const limit = 3;

class CategoryPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      items: [],
      isLoadmore: true,
      title: "",
      content: "",
    };
  }

  loadListPostByCategory = async () => {
    try {
      const href = window.location.href;
      const id = href.substring(href.lastIndexOf(".") + 1, href.length);
      const url = domain + `api/posts?limit=${limit}&tag_id=${id}`;

      const fetchData = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(url, fetchData);
      const result = await response.json();
      const paging = result.paging;
      const { next_cursor: nextCursor } = paging;
      const isLoadmore =
        result.data.length < limit || nextCursor === "" ? false : true;

      this.setState({
        isLoaded: true,
        items: result.data,
        id,
        isLoadmore,
        cursor: nextCursor,
      });

      const url2 = domain + `api/tags/${id}`;
      const response2 = await fetch(url2, fetchData);
      const result2 = await response2.json();
      this.setState({
        title: result2.data.name,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  };
  LoadMore = () => {
    const { cursor, id } = this.state;
    const url = domain + `api/posts?tag_id=${id}&cursor=${cursor}`;
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
          const nextCursor = result?.paging?.next_cursor;
          if (!result.data) {
            this.setState({
              isLoaded: true,
              error: result.data,
            });
          } else {
            let tmp = this.state.items;
            this.setState({
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

  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  componentDidMount() {
    this.loadListPostByCategory();
  }
  render() {
    const { items, isLoadmore, title, content } = this.state;
    return (
      <div>
        <Header
          background={`../assets/img/anh-${this.getRndInteger(2, 18)}.jpg`}
          title={title}
          content={content}
        />
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 mx-auto">
                <div className="row">
                  {items.length === 0 ? "Hiện chưa có bài viết nào!" : ""}
                  {items.map((value, index) => {
                    return <PostItem key={index} post={value} />;
                  })}
                </div>
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
      </div>
    );
  }
}

export default CategoryPost;
