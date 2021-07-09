import React from "react";
import { ReactComponent as LogoFb } from '../../../assets/image/logofacebook.svg';
import { ReactComponent as LogoInsta } from '../../../assets/image/logoinstagram.svg';
import { ReactComponent as LogoTwitter } from '../../../assets/image/logotwitter.svg';
import { ReactComponent as LogoLinkedin } from '../../../assets/image/logolinkedin2.svg';

// const openInNewTab = (url) => {
//   const newWindow = window.open(url, "_blank", "noopener,noreferrer");
//   if (newWindow) newWindow.opener = null;
// };

function AboutTeamCard(props) {
  return (
    <div className="aboutteam__card__main">
      <div className="aboutteam__card__main_photo">
        <img src={props.photo} className="aboutteam__card__main_photo_style" alt="developers pic"></img>
      </div>
      <div className="aboutteam__card__main__developer_info">
        <h1 className="aboutteam__card__main__developer_name"> {props.developerName} </h1>
        <p className="aboutteam__card__main__developer_role">{props.position}</p>
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
