import React from 'react'


const EventCarousel = function() {

    return(
        <>
            <div className="image__container">
                <div className="image__content image__content1">
                    <img src="../../../img/event-img1.webp" alt="Event-1"  className="event-img"/>
                    <div className="image-shade">&nbsp;</div>
                </div>
                <div className="image__content image__content2">
                    <img src="../../../img/event-img2.webp" alt="Event-2"  className="event-img"/>
                    <div className="image-shade">&nbsp;</div>
                </div>
                <div className="image__content image__content3">
                    <img src="../../../img/event-img3.webp" alt="Event-3"  className="event-img"/>
                    <div className="image-shade">&nbsp;</div>
                </div>
            </div>            
        </>
    );

}

export default EventCarousel
