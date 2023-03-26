import React, { Component } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

class SocialMediaButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      href: "",
    };
  }

  componentDidMount() {
    const href = window.location.href;
    this.setState({ href });
  }
  render() {
    const { href } = this.state;
    return (
      <FacebookShareButton
        url={href}
        quote={"ThanhHV - Khám phá vũ trụ mã nguồn mở"}
        hashtag="#HTBlog"
      >
        <FacebookIcon size={36} />
      </FacebookShareButton>
    );
  }
}

export default SocialMediaButtons;
