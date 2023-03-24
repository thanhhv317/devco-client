import React from "react";
import HelmetMetaData from "../SocialMediaButtons/HelmetMetaData";

const Post = (props) => {
  const { content, title, author, gallery } = props;
  return (
    <div>
      <article>
        <div className="container">
          <div className="row">
            <HelmetMetaData
              title={title}
              description={title + author}
              image={gallery}
            ></HelmetMetaData>
            <div
              className="col-lg-12 col-md-12 col-12 mx-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Post;
