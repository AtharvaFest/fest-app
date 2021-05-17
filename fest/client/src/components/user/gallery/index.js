import React from "react";

import Nav from "../nav";
import Footer from "../footer";

import ReactImageGallery from "./ReactImageGallery";

const Gallery = function () {
  return (
    <div>
      <Nav />
      <div className="gallery_main after-navigation">
        <div className="gallery_photos_body">
          <ReactImageGallery />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Gallery;
