import React from "react";

function AboutDiv() {
  return (
    <div>
      <div className="aboutdiv__main">
        <div className="aboutdiv__main_pic">
          <img
            className="aboutdiv__main_pic_style"
            src="../../../img/atharva_logo.png"
            alt="logo"
          ></img>
        </div>
        <div className="aboutdiv__main_text">
          <h1 className="aboutdiv__main__text__heading">About us</h1>
          <p className="aboutdiv__main__text__paragraph">
            lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
            dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit
            amet, consectetur adipiscing elit lorem ipsum dolor sit amet,
            consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur
            adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing
            elit lorem ipsum dolor sit amet, consectetur adipiscing elit lorem
            ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor
            sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet,
            consectetur adipiscing elit{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutDiv;
