import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./../Home";
import About from "./../About";
import Header from "../Header";
import PostDetail from "./../PostDetail";
import Category from "../Category";
import CategoryPost from "../Category/CateogryPost";
import PageNotFound from "../404";

class PageSwitch extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Header
              background="assets/img/alo2.jpg"
              title="BlogHT "
              content=" Chia sẻ là sức mạnh"
            />
            <Home />
          </Route>
          <Route exact path="/about">
            <Header
              background="assets/img/alo4.jpg"
              title="About me"
              content=""
            />
            <About />
          </Route>
          <Route exact path="/category">
            <Category />
          </Route>
          <Route exact path="/category/:slug">
            <CategoryPost />
          </Route>
          <Route exact path="/post/:slug">
            <PostDetail />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default PageSwitch;
