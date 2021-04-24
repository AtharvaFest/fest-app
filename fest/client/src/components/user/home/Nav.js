import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from  'react-redux'

import Logout from '../forms/Logout'
import auth from '../../../auth'
import {Alert} from '../../Alert'


class Nav extends React.Component{

    dropdownContainer = React.createRef()

    // on event click, toggle bettween sub option inside event menu
    showMenu = (e) => {
        this.dropdownContainer.current.classList.toggle('show');
        
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

        return <Logout />
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr)=>{
        if(alertInfo){
            return(
                <div id="alert-login"><Alert message="Login successful" containerId="#alert-login" alertType={"info"} /></div>
            );
        }
        if(alertErr){
            return(
                <div id="alert-login"><Alert message="Unable to login" containerId="#alert-login" alertType={"error"} /></div>
            );
        }

        return<div id="alert-login"><Alert message="Unable to login" containerId="#alert-login" alertType={"error"} /></div>;
        
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
                                <Link to="#" onClick={(e) => this.showMenu(e)}  className="nav__link dropdown__btn">
                                    event
                                </Link>
                                <div className="dropdown__container disappear" ref={this.dropdownContainer}>
                                    <div className="dropdown__menu">
                                        <a href="/register" className="dropdown__menu--list">event registration</a>
                                        <a href="/dashboard" className="dropdown__menu--list">event dashboard</a>
                                        <a href="/notice" className="dropdown__menu--list">event notice</a>
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
                            </li>
                        </ul>
                    </nav>
                </div>

                {this.props.isLogin === false?<Alert message="Logout successful" containerId="alert-logout" alertType={"info"} />:""}
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return state.userAuthReducer
}

export default connect(mapStateToProps)(Nav)