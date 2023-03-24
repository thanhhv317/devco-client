import React, { Component } from "react";
import { domain } from "../../../utils/config";
import PostItem from "../../PostItem";
import Header from "../../Header";
import _ from "lodash";
import { Link } from "react-router-dom";

class CategoryPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
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

      const url = domain + `posts/client/list_by_category?cateId=${id}`;

      const fetchData = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(url, fetchData);
      const result = await response.json();
      let tmp = result.data.posts.length > 20 ? true : false;
      this.setState({
        isLoaded: true,
        items: result.data.posts,
        id,
        isLoadmore: tmp,
      });

      const url2 = domain + `categories/view/${id}`;
      const response2 = await fetch(url2, fetchData);
      const result2 = await response2.json();
      this.setState({
        title: result2.data.category.name,
        content: result2.data.category.description,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  };
  LoadMore = () => {
    const { page, id } = this.state;
    const url =
      domain + `posts/client/list_by_category?cateId=${id}&page=${page + 1}`;
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

  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  componentDidMount() {
    this.loadListPostByCategory();
  }
  render() {
    const { items, isLoadmore, title, content } = this.state;
    console.log()
    return (
      <div>
        <Header
          background={`../assets/img/anh-${this.getRndInteger(2,18)}.jpg`}
          title={title}
          content={content}
        />
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 mx-auto">
                <div className="row">
                  {items.length===0 ? 'Hiện chưa có bài viết nào!' : ''}
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
