import React from 'react'

const Nav = function() {

    return(
        <div className="navigation">
                <input type="checkBox" className="navigation__checkbox" id="navi-toggle"/>

                <label htmlFor="navi-toggle" className="navigation__button">
                    <span className="navigation__icon">&nbsp;</span>
                </label>

                <div className="navigation__background">&nbsp;</div>

                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item ">
                            <a href="#"  className="nav__link">home</a>
                        </li>
                        <li className="nav__item">
                            <a href="#"  className="nav__link">gallery</a>
                        </li>
                        <li className="nav__item">
                            <a href="#"  className="nav__link">event</a>
                        </li>
                        <li className="nav__item">
                            <a href="#"  className="nav__link">about us</a>
                        </li>
                        <li className="nav__item">
                            <a href="#"  className="nav__link">contact</a>
                        </li>
                        <li className="nav__item">
                            <a href="#"  className="nav__link">profile</a>
                        </li>
                    </ul>
                </nav>
            </div>
    );

}

export default Nav