import React,{useRef,useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from  'react-redux'

import Logout from '../forms/Logout'

const Nav = function() {
    const dropdownContainer = useRef();
    const [toggleMenu,setToggleMenu] = useState(true);

    // on event click, toggle bettween sub option inside event menu
    const showMenu = (e) => {
        const flag = !toggleMenu;
        setToggleMenu(flag);
       
        if(toggleMenu){
            dropdownContainer.current.classList.add('show');
            return;
        }
        dropdownContainer.current.classList.remove('show');
        
    }

    //display login modal on login click
    const displayLogin = (e) => {
        const modal = document.querySelector(`#modal-login`);
        modal.classList.add('visible');
    }

    //LOGIN OR LOGOUT OPTION
    const loginOrLogout = () => {
        if(!localStorage.getItem('token'))
            return <a href="#modal-login" onClick={(e) => displayLogin(e)}  className="nav__link">login</a>

        return <Logout />
    }


    return(
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
                            <Link to="" onClick={(e) => showMenu(e)}  className="nav__link dropdown__btn">
                                event
                            </Link>
                            <div className="dropdown__container disappear" ref={dropdownContainer}>
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
                            {loginOrLogout()}
                        </li>
                    </ul>
                </nav>
            </div>
    );

}

const mapStateToProps = (state) => {
    return state.authReducer
}

export default connect(mapStateToProps)(Nav)