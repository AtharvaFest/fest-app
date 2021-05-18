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
                <div> <AboutTeamCard /> </div>
                <div> <AboutTeamCard /> </div>
                <div> <AboutTeamCard /> </div>
            </div>
        </div>
    )
}

export default AboutTeam
