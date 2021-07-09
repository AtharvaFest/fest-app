import React from "react";

import Nav from "../nav";
import Footer from "../footer";
import afterNavigation from '../HOC/afterNavigation';

import ReactImageGallery from "./ReactImageGallery";

class Gallery extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="gallery_main after-navigation" style={this.props.minMainContentHeight}>
          <div className="gallery_photos_body">
            <ReactImageGallery />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
  
};

export default afterNavigation(Gallery);
