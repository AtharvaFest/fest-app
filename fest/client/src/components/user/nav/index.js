import React from 'react'
import {Link} from 'react-router-dom'

class Nav extends React.Component {
    rightMenuRef = React.createRef();
    subMenuRef = React.createRef();
    state = {rightMenu:false}

    // on click, toggle sub-menu of event option
    showSubMenu = () => {
        this.subMenuRef.current.classList.toggle('sub-menu__visible')
    }

    // apply animation in mobile mode
    showRightMenu = () => {
        this.rightMenuRef.current.classList.toggle('right-menu__visible')
    }

    render(){
        return(
            <div className="horizontal-nav__container">
                <div className="horizontal-nav__left">
                        Brand
                </div>
                <div className="horizontal-nav__right" ref={this.rightMenuRef}>
                    <ul className="horizontal-nav__items">
                        <li className="horizontal-nav__item">
                            <Link to="/" className="horizontal-nav__link">Home</Link>
                        </li>
                        <li className="horizontal-nav__item">
                            <Link to="/" className="horizontal-nav__link">Gallery</Link>
                        </li>
                        <li className="horizontal-nav__item event__item">
                            <Link to="#" className="horizontal-nav__link " onClick={this.showSubMenu}>
                                Event
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            </Link>
                            <ul ref={this.subMenuRef} className="horizontal-nav--sub-menu">
                                <li>
                                    <Link to="/" className="horizontal-nav--sub-menu__item">
                                        event registration
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="horizontal-nav--sub-menu__item">
                                        event dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="horizontal-nav--sub-menu__item">
                                        event notice
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="horizontal-nav__item">
                            <Link to="/" className="horizontal-nav__link">Contact</Link>
                        </li>
                        <li className="horizontal-nav__item">
                            <Link to="/" className="horizontal-nav__link">About</Link>
                        </li>
                        <li className="horizontal-nav__item">
                            <Link to="/" className="horizontal-nav__link">Login</Link>
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

export default Nav