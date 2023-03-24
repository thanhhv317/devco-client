import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { domain } from "../../../utils/config";

class HelmetMetaData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: "",
      quote: "",
      title: "",
      image: "",
      description: "",
      hashtag: "",
    };
  }

  componentDidMount() {
    let currentUrl = window.location.href;
    let quote = this.props.quote !== undefined ? this.props.quote : "";
    let title =
      this.props.title !== undefined
        ? this.props.title
        : "BlogHT - Chia sẻ là sức mạnh";
    let image =
      this.props.image !== undefined
        ? domain + this.props.image
        : domain + "public/gallery/anh-16.jpg";
    let description =
      this.props.description !== undefined
        ? this.props.description
        : "Nếu bạn là một lập trình viên thì tôi dám chắc chắn bạn cũng đã biết điều này: công nghệ thay đổi và những gì bạn biết ngày hôm nay có thể không còn được sử dụng 1 tháng sau đó. Vì vậy việc cập nhật các công nghệ mới là điều hết sức cần thiết cho các lập trình viên.";
    let hashtag =
      this.props.hashtag !== undefined ? this.props.hashtag : "#bloght";
    this.setState({
      currentUrl,
      quote,
      title,
      image,
      description,
      hashtag,
    });
  }

  render() {
    const {
      title,
      quote,
      currentUrl,
      image,
      description,
      hashtag,
    } = this.state;
    return (
      <Helmet>
        <title>{title}</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="csrf_token" content="" />
        <meta property="type" content="website" />
        <meta property="url" content={currentUrl} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="_token" content="" />
        <meta name="robots" content="noodp" />
        <meta property="title" content={title} />
        <meta property="quote" content={quote} />
        <meta name="description" content={description} />
        <meta property="image" content={image} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:quote" content={quote} />
        <meta property="og:hashtag" content={hashtag} />
        <meta property="og:image" content={image} />
        <meta content="image/*" property="og:image:type" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="HTBlog" />
        <meta property="og:description" content={description} />{" "}
      </Helmet>
    );
  }
}

export default HelmetMetaData;
