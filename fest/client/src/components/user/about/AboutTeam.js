import React from 'react'
import AboutTeamCard from './AboutTeamCard'

function AboutTeam() {
    return (
        <div className="about-team__section">
            <div className="aboutteam__heading2">
                <div className="aboutteam__heading2--content">
                    Our Developers
                </div>
            </div>
            <div className='aboutteam__card'>
                <div> <AboutTeamCard photo="../../../img/head--2.webp" developerName="Rahul Gupta" position="Full Stack Developer"/> </div>
                <div> <AboutTeamCard photo="../../../img/head--1.webp" developerName="Riya Patel" position="Full Stack Developer" /> </div>
                <div> <AboutTeamCard photo="../../../img/pradeep.webp" developerName="Pradeep Ingle" position="Full Stack Developer" /> </div>
            </div>
        </div>
    )
}

export default AboutTeam
