import React from 'react';
import rahul from "../../../assets/image/head--1.webp";

function AboutTeamCard() {
    return (
        <div className="aboutteam__card__main">
            <div class="aboutteam__card__main__ourTeam">
                <div class="aboutteam__card__main__pic">
                    <img src={rahul} alt="rahul" />
                    <ul class="aboutteam__card__main__social">
                        <li><a href="https://www.facebook.com/rahul6542" target="_blank">
                            <div className="social_icon_facebook">

                            </div>
                            </a></li>
                        <li><a href="https://www.instagram.com/i.am.rahu/?igshid=1dowk8mx5u85t" target="_blank">
                            <div className="social_icon_instagram">
                                
                            </div>
                            </a></li>
                        <li><a href="https://twitter.com/i_am_rahu" target="_blank">
                            <div className="social_icon_twitter">
                                
                            </div>
                            </a></li>
                    </ul>
                </div>
                <div class="aboutteam__card__main__teamContent">
                    <h3 class="aboutteam__card__main__title">Rahul Bhai</h3>
                    <span class="aboutteam__card__main__post">Full Stack Developer</span>
                </div>
            </div>
        </div>
    )
}

export default AboutTeamCard
