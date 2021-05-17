import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from  'react-redux'

import Logout from '../auth/Logout'
import auth from '../../../auth'


class Nav extends React.Component{

    dropdownEventContainer = React.createRef()
    dropdownAccountContainer = React.createRef()
    // on event click, toggle bettween sub option inside event menu
    showEventMenu = (e) => {
        this.dropdownEventContainer.current.classList.toggle('show');
        
    }
    // on event click, toggle bettween sub option inside account menu
    showAccountMenu = (e) => {
        this.dropdownAccountContainer.current.classList.toggle('show');
        
    }

    //display login modal on login click
    displayLogin = (e) => {
        const modal = document.querySelector(`#modal-login`);
        modal.classList.add('visible');
    }

    //LOGIN OR LOGOUT OPTION
    loginOrLogout = () => {
        
        if(!auth.isAuthenticated())
            return <a href="#modal-login" onClick={(e) => this.displayLogin(e)}  className="nav__link">login</a>

        return <Link to="#" onClick={(e) => this.showAccountMenu(e)} className="nav__link dropdown__btn" >Account</Link>
    }


    render(){
        return(
            <>
            <div className="navigation">
                    {/* checkbox for functioning nav */}
                    <input type="checkBox" className="navigation__checkbox" id="navi-toggle"/>

                    <label htmlFor="navi-toggle" className="navigation__button">
                        <span className="navigation__icon">&nbsp;</span>
                    </label>

                    <div className="navigation__background">&nbsp;</div>

                    <nav className="nav">
                        <ul className="nav__list">
                            <li className="nav__item ">
                                <Link to="/" className="nav__link" >
                                    home
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link to="/gallery" className="nav__link" >
                                    gallery
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link to="#" onClick={(e) => this.showEventMenu(e)}  className="nav__link dropdown__btn">
                                    event
                                </Link>
                                <div className="dropdown__container disappear" ref={this.dropdownEventContainer}>
                                    <div className="dropdown__menu">
                                        <Link to="/event/registration" className="dropdown__menu--list">event registration</Link>
                                        <Link to="/event/dashboard" className="dropdown__menu--list">event dashboard</Link>
                                        <Link to="/event/notice" className="dropdown__menu--list">event notice</Link>
                                    </div>
                                </div>
                            </li>
                            <li className="nav__item">
                                <Link to="/about" className="nav__link" >
                                    about us
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link to="/contact" className="nav__link" >
                                    contact us
                                </Link>
                            </li>
                            <li className="nav__item">
                                {this.loginOrLogout()}
                                <div className="dropdown__container disappear" ref={this.dropdownAccountContainer}>
                                    <div className="dropdown__menu">
                                        <Link to="/account/profile" className="dropdown__menu--list">Profile</Link>
                                        <Logout class_name="dropdown__menu--list" showAccountMenu={() => this.showAccountMenu()} />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>

            </>
        );
    }

}

const mapStateToProps = (state) => {
    return state.userAuthReducer
}

export default connect(mapStateToProps)(Nav)