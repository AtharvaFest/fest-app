import React from 'react'

import Nav from '../nav'

const Gallery = function() {

    return(
        <div>
            <Nav />
            <div className="after-navigation"> {/*Styled in _navigation.scss*/}
                Gallery
            </div>
        </div>
    );
}

export default Gallery