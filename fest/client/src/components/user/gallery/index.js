import React from "react";

import Nav from "../nav";
import Footer from "../footer";

const Gallery = function () {
  return (
    <div>
      <Nav />
      <div className="gallery_main after-navigation">
        <div className="gallery_photos">
          gallery
        </div>        
        <Footer />
      </div>
    </div>
  );
};

export default Gallery;
