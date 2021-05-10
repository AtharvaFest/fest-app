import React from 'react'
import Nav from '../nav'
import Footer from '../footer'

import AboutDiv from './AboutDiv'
import AboutTeam from './AboutTeam'

// const abc = "#f8f3f9"

const About = function() {

    return(
        <div>     
            <Nav />
            <div className="aboutus__main after-navigation">
                <AboutDiv />
                <AboutTeam />
                <Footer />
            </div>
        </div>
    );
}

export default About