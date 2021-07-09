import React from "react";

let year = new Date();
const current_year = year.getFullYear();

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

const Footer = function () {
  return (
    <div className="footer_container" id="footer">
      <footer className="footer">
        <div className="col_sm_12 col_md_12 col_lg_6 footer_about">
          About
          <p className="fotter_about_paragraph">
            lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor
            sit amet, consectetur adipiscing lorem ipsum dolor sit amet,
            consectetur adipiscing lorem ipsum dolor sit amet, consectetur
            adipiscing lorem ipsum dolor sit amet, consectetur adipiscing lorem
            ipsum dolor sit amet, consectetur adipiscing
          </p>
        </div>
        <div className="col_sm_6 col_md_6 col_lg_3 footer_categories">
          Categories
          <span onClick={() => openInNewTab('#')}>Registeration</span>
          <span onClick={() => openInNewTab('#')}>Notice</span>
          <span onClick={() => openInNewTab('#')}>Dashboard</span>
        </div>
        <div className="col_sm_6 col_md_6 col_lg_3 footer_quicklinks">
          Quick Links
          <span onClick={() => openInNewTab('#')}>About Us</span>
          <span onClick={() => openInNewTab('#')}>Contact Us</span>
          <span onClick={() => openInNewTab('#')}>Login</span>
        </div>
        <div className="col_sm_12 col_md_12 col_lg_12 footer_divider_line"></div>
        <div className="footer_copyright_and_social">
          <div className="col_sm_12 col_md_6 col_lg_6 footer_copyright">
            &#169; {current_year} | All rigths reserved
          </div>
          <div className="col_sm_12 col_md_6 col_lg_6 footer_social">
            <span onClick={() => openInNewTab('#')} className="footer_social_icon_facebook"></span>
            <span onClick={() => openInNewTab('#')} className="footer_social_icon_instagram"></span>
            <span onClick={() => openInNewTab('#')} className="footer_social_icon_twitter"></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
