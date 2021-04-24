import React from 'react'
import Nav from '../nav'

const About = function() {

    return(
        <div>
            <Nav />
            <div className="after-navigation"> {/*Styled in _navigation.scss*/}
                About
            </div>
        </div>
    );
}

export default About