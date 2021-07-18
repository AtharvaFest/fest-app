import React from "react";

import Nav from "../nav";
import Footer from "../footer";
import afterNavigation from "../HOC/afterNavigation";

class Contact extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div
          className="after-navigation"
          style={this.props.minMainContentHeight}
        >
          <div className="contactus__main">
            <div>
              <div className="contactus__main_form">
                <div className="contactus__main_form_div">
                  <div className="contactus__main_form_heading">Contact Us</div>
                  <input type="text" placeholder="Name" className="contactus__form_input"/>
                  <input type="text" placeholder="Email" className="contactus__form_input"/>
                  <input type="text" placeholder="Feedback" className="contactus__form_input"/>
                  <div className="contactus__form_button">
                    <button type="button"> Submit </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="contactus__main_map">
                <div className="contactus__main_map_div">
                  <div
                    id="map"
                    style = {{height:"450px"}}
                  >
                    <iframe
                      title="Direction"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.941512493095!2d72.82516401443576!3d19.19775675312383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7c24db49add%3A0x973ee0458244da44!2sAtharva%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1594870034904!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{border: "0"}}
                      aria-hidden="false"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default afterNavigation(Contact);
