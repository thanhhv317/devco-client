import React, { Component } from "react";
import { Link } from "react-router-dom";
const toLower = require("lodash/toLower");

const convertText2Slug = (title) => {
  let slug;
  slug = toLower(title).trim();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  slug = slug.replace(/ /gi, "-");
  return slug;
};

class CategoryItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="col-lg-6 col-md-6 mx-auto">
        <div className="column">
          <h4 className="head">
            <Link
              to={`/category/${convertText2Slug(item.name)}.${item._id}`}
              target="_blank"
            >
              {item.name}
            </Link>
          </h4>
          <p className="panel">{item.description}</p>
        </div>
      </div>
    );
  }
}

export default CategoryItem;
