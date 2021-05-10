import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from  'react-redux'

import Logout from '../auth/Logout'
import auth from '../../../auth'

class Nav extends React.Component {
    rightMenuRef = React.createRef();
    eventSubMenuRef = React.createRef();
    accountSubMenuRef = React.createRef();
    eventItemRef = React.createRef();
    accountItemRef = React.createRef();
    state = {rightMenu:false}

    // on click, toggle sub-menu of event option
    showEventSubMenu = () => {
        this.eventSubMenuRef.current.classList.toggle('event-sub-menu__visible')
    }

    // on click, toggle sub-menu of event option
    showAccountSubMenu = () => {
        this.accountSubMenuRef.current.classList.toggle('account-sub-menu__visible')
    }

    // apply animation in mobile mode
    showRightMenu = () => {
        this.rightMenuRef.current.classList.toggle('right-menu__visible')
    }

    //display login modal on login click
    displayLogin = (e) => {
        const modal = document.querySelector(`#modal-login`);
        modal.classList.add('visible');
    }

    //LOGIN OR LOGOUT OPTION
    loginOrLogout = () => {
        
        if(!auth.isAuthenticated())
            return <a href="#modal-login" onClick={(e) => this.displayLogin(e)}  className="horizontal-nav__link">Login</a>

        return <a href="#account" ref={this.accountItemRef} onClick={this.showAccountSubMenu} className="horizontal-nav__link nav-link" >
                    Account
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </a>
    }

    componentDidMount(){
        const allMenuItems = document.querySelectorAll('.nav-link');
        if(window.location.pathname.includes('event')){
            this.eventItemRef.current.classList.add('active__item');
        }
        if(window.location.pathname.includes('account')){
            this.accountItemRef.current.classList.add('active__item');
        }
        allMenuItems.forEach((item) => { 
            if(item.getAttribute('href') === window.location.pathname){
                item.classList.add('active__item')
                
            }
        })
    }

    logoutAlert(){
        console.log(this.props.isLogin);
        if(this.props.isLogin){
            console.log("true");
        }
    }

    logoutButton(){
        return(
            <Logout class_name="horizontal-nav--sub-menu__item" onClick={this.logoutAlert} showAccountMenu={() => this.showAccountSubMenu()} />
        )
    }

    
    

    render(){
        return(
            <div className="horizontal-nav__container">
                <div className="horizontal-nav__left">
                        Brand
                </div>
                <div className="horizontal-nav__right" ref={this.rightMenuRef}>
                    <ul className="horizontal-nav__items" >
                        <li className="horizontal-nav__item">
                            <Link to="/" className="horizontal-nav__link nav-link">Home</Link>
                        </li>
                        <li className="horizontal-nav__item">
                            <Link to="/gallery" className="horizontal-nav__link nav-link">Gallery</Link>
                        </li>
                        <li className="horizontal-nav__item event__item">
                            <a href="#event" ref={this.eventItemRef}  className="horizontal-nav__link  nav-link" onClick={this.showEventSubMenu}>
                                Event
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            </a>
                            <ul ref={this.eventSubMenuRef} className="horizontal-nav--sub-menu">
                                <li>
                                    <Link to="/event/registration" className="horizontal-nav--sub-menu__item  nav-link">
                                        event registration
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/event/dashboard" className="horizontal-nav--sub-menu__item nav-link">
                                        event dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/event/notice" className="horizontal-nav--sub-menu__item nav-link">
                                        event notice
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="horizontal-nav__item">
                            <Link to="/contact" className="horizontal-nav__link nav-link">Contact</Link>
                        </li>
                        <li className="horizontal-nav__item">
                            <Link to="/about" className="horizontal-nav__link nav-link">About</Link>
                        </li>
                        <li className="horizontal-nav__item">
                                {this.loginOrLogout()}
                                <ul ref={this.accountSubMenuRef} className="horizontal-nav--sub-menu">
                                    <li>
                                        <Link to="/account/profile" className="horizontal-nav--sub-menu__item nav-link">Profile</Link>
                                    </li>
                                    <li>
                                        {this.logoutButton()}
                                    </li>
                                </ul>
                        </li>
                    </ul>
                </div>
                <div className="burger" onClick={this.showRightMenu}>
                    <div className="burger__lines"></div>
                    <div className="burger__lines"></div>
                    <div className="burger__lines"></div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return state.userAuthReducer
}

export default connect(mapStateToProps)(Nav)