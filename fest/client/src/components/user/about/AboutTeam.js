import React from 'react'
import AboutTeamCard from './AboutTeamCard'

function AboutTeam() {
    return (
        <div>
            <div className="aboutteam__heading">
                Meet our Brilliant Minds
            </div>
            <div className="aboutteam__heading2">
                Our Developers
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
