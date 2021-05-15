import React from "react";
import rahul from "../../../assets/image/head--1.webp";
import { ReactComponent as LogoFb } from '../../../assets/image/logofacebook.svg';
import { ReactComponent as LogoInsta } from '../../../assets/image/logoinstagram.svg';
import { ReactComponent as LogoTwitter } from '../../../assets/image/logotwitter.svg';
import { ReactComponent as LogoLinkedin } from '../../../assets/image/logolinkedin.svg';

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

function AboutTeamCard() {
  return (
    <div className="aboutteam__card__main">
      <div className="aboutteam__card__main_photo">
        <img src={rahul} className="aboutteam__card__main_photo_style" alt="developers image"></img>
      </div>
      <div className="aboutteam__card__main__developer_info">
        <h1 className="aboutteam__card__main__developer_name"> Rahul Gupta </h1>
        <p className="aboutteam__card__main__developer_role">Full Stack Developer</p>
      </div>
      <div className="aboutteam__card__main_socialicons">
        <div><LogoFb className="aboutteam__card__main_socialicons_singleicon" /></div>
        <div><LogoInsta className="aboutteam__card__main_socialicons_singleicon" /></div>
        <div><LogoTwitter className="aboutteam__card__main_socialicons_singleicon" /></div>
        <div><LogoLinkedin className="aboutteam__card__main_socialicons_singleicon" /></div>
      </div>
    </div>
  );
}

export default AboutTeamCard;
