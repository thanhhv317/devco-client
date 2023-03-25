import React, { Component } from "react";
import PostHeader from "./../PostHeader";
import Post from "./../Post";
import { domain } from "../../utils/config";
import SocialMediaButtons from "../SocialMediaButtons/FacebookShare";
import PageNotFound from "../404";
import HelmetMetaData from "../SocialMediaButtons/HelmetMetaData";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      items: [],
      postId: "",
    };
  }

  componentDidMount() {
    const href = window.location.href;
    const id = href.substring(href.lastIndexOf(".") + 1, href.length);
    this.setState({
      postId: id,
    });

    const url = domain + `api/posts/${id}`;
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
            items: result.data,
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
    const { isLoaded, items, error, postId } = this.state;
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
      if (items === undefined) {
        return <PageNotFound />;
      }
      return (
        <div>
          <HelmetMetaData
            title={items.title}
            image={`${domain}${items.thumbnail}`}
            description={
              items.content.replace(/<[^>]*>/g, "").substr(0, 120) + "..."
            }
          ></HelmetMetaData>
          <div>
            <PostHeader
              title={items.title}
              author={""}
              createdDate={items.createdAt}
              image={items.thumbnail}
            />
            <Post
              content={items.content}
              title={items.title}
              gallery={items.thumbnail}
              author={""}
            />
            <div className="share-social-btn">
              <div>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      Chia sẻ: <SocialMediaButtons />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default PostDetail;
