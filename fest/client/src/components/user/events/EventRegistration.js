import React from 'react'
import Footer from '../footer'
import Nav from '../nav'
import EventCarousel from './EventCarousel'

class EventRegistration extends React.Component {

    render(){
        return(
            <div>
                <Nav />
                <div className="after-navigation"> {/*Styled in _navigation.scss*/}
                    <div className="event-reg__section">
                        <EventCarousel />
                        <div className="event-reg__container">
                            <div className="event-reg__content">
                                <table className="event-reg__table">
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Date</th>
                                            <th>Price</th>
                                            <th>Discount</th>
                                            <th>Register</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Carrom</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>Pubg</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>valorent</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>cheeee</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>Carrom</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>Pubg</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>valorent</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>chess</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>valorent</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>chess</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>Carrom</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>Pubg</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>valorent</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>chess</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>valorent</td>
                                            <td>Fri Jan 31 2020</td>
                                            <td>55</td>
                                            <td>20%</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default EventRegistration