import React from 'react'

const Header = function() {

    return(
        <header className="header">
            

            {/* <nav className="nav">
                <ul className="nav__list">
                    <div className="nav__left">
                        <div>Logo</div>
                        <li className="nav__item ">
                            <a href="#" onClick={(e) => activeElement(e)}  className="nav__link --active">home</a>
                        </li>
                        <li className="nav__item">
                            <a href="#" onClick={(e) => activeElement(e)}  className="nav__link">gallery</a>
                        </li>
                        <li className="nav__item">
                            <a href="#" onClick={(e) => activeElement(e)}  className="nav__link">event</a>
                        </li>
                        <li className="nav__item">
                            <a href="#" onClick={(e) => activeElement(e)}  className="nav__link">about us</a>
                        </li>
                        <li className="nav__item">
                            <a href="#" onClick={(e) => activeElement(e)}  className="nav__link">contact</a>
                        </li>
                        <li className="nav__item">
                            <a href="#" onClick={(e) => activeElement(e)}  className="nav__link">profile</a>
                        </li>
                    </div>
                    <div className="nav__right"> 
                        &nbsp;
                    </div>
                </ul>
            </nav> */}
            <div className="header__heading">
                <h1 className="heading--1 header__heading--1">
                    Atharva
                </h1>
                <h2 className="heading--2 header__heading--2">
                    Festivals
                </h2>
            </div>
        </header>
    );

}


export default Header