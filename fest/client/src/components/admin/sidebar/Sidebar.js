import React from 'react'
import {Link} from 'react-router-dom'

class Sidebar extends React.Component{

    render(){
        return(
            <div className="sidebar__container">
                
                <div className="admin-panel__heading">
                    <div className="admin-panel__heading--1">
                        <h3>admin</h3>
                    </div>
                    <div className="admin-panel__heading--2">
                        <h3>panel</h3>
                    </div>
                </div>
                <div className="sidebar__nav">
                    <div className="sidebar__nav--items sidebar__nav--items--active">
                       
                        <Link to="/user" className="item">
                            <span className="nav__icon"><ion-icon name="people-outline" /></span>
                            <span>user</span>
                        </Link>
                    </div>
                    <div className="sidebar__nav--items">
                        <Link to="/user" className="item">
                            <span className="nav__icon"><ion-icon name="images-outline" /></span>
                            <span>gallery</span>
                        </Link>
                    </div>
                    <div className="sidebar__nav--items">
                        <Link to="/user" className="item">
                            <span className="nav__icon"><ion-icon name="football-outline" /></span>
                            <span>event</span>
                        </Link>
                    </div>
                    <div className="sidebar__nav--items">
                        <Link to="/user" className="item">
                            <span className="nav__icon"><ion-icon name="notifications-outline" /></span>
                            <span>notice</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default Sidebar