import React from 'react'

import Nav from '../nav'

const Profile = function() {

    return(
        <div>
            <Nav />
            <div className="after-navigation"> {/*Styled in _navigation.scss*/}
                <section className="profile__section">
                    <div className="profile__student-details">
                        <h4 className="heading--4 details__heading">Details</h4>
                        <div className="profile__student-details--content">
                            <table className="details__table">
                                <tbody>
                                    <tr>
                                        <td>Name:-</td>
                                        <td>Pradeep Ingle</td>
                                    </tr>
                                    <tr>
                                        <td>Username:-</td>
                                        <td>prad</td>
                                    </tr>
                                    <tr>
                                        <td>Email:-</td>
                                        <td>inglepradeep00@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile Number:-</td>
                                        <td>1234567890</td> 
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile