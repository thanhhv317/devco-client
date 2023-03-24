import React, { Component } from "react";
import Header from "../Header";
import { domain } from "../../utils/config";
import CategoryItem from "./Item";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  loadCategory = async () => {
    try {
      const url = domain + "categories/list";
      const fetchData = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(url, fetchData);
      const result = await response.json();
      this.setState({
        isLoaded: true,
        items: result.data.category,
      });

      console.log(result);
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  };

  componentDidMount() {
    this.loadCategory();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <div className="animation-area">
          <Header
            background="assets/img/alo3.jpg"
            title="Thể loại"
            content=""
          />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>{error.message}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div>
          <Header
            background="assets/img/alo3.jpg"
            title="Thể loại"
            content=""
          />
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 mx-auto">
                  Đang tải...
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header
            background="assets/img/alo3.jpg"
            title="Thể loại"
            content=""
          />
          <div>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 mx-auto">
                  <div className="row">
                    {items.map((value, index) => {
                      return <CategoryItem key={index} item={value} />;
                    })}
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

export default Category;
