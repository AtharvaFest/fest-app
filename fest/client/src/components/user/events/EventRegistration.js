import React from 'react'
import Footer from '../footer'
import Nav from '../nav'
import EventCarousel from './EventCarousel'
import EventRegistrationTable from './EventRegistrationTable'

class EventRegistration extends React.Component {

    render(){
        return(
            <div>
                <Nav />
                <div className="after-navigation"> {/*Styled in _navigation.scss*/}
                    <div className="event-reg__section">
                        <EventCarousel />
                        <EventRegistrationTable />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default EventRegistration