import React from "react";

import Nav from "../nav";
import Footer from "../footer";
import afterNavigation from '../HOC/afterNavigation';

class Contact extends React.Component {
  render(){
    return (
      <div>
        <Nav />
        <div className="after-navigation" style={this.props.minMainContentHeight}>
          <div className="">
            <div className="">
              Contact us
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
  
};

export default afterNavigation(Contact);
