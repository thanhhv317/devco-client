import React from "react";
import "./../App.css";
import Nav from "./Nav";
import Footer from "./Footer";
import PageSwitch from "./PageSwitch";
import BackToTop from "./BackToTop";
import { BrowserRouter as Router} from "react-router-dom";
import HelmetMetaData from "./SocialMediaButtons/HelmetMetaData";

function App() {
  return (
    <Router>
      <div>
        <HelmetMetaData/>
        <Nav />
        <BackToTop />
        <PageSwitch />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
