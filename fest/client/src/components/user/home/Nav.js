import React,{useRef,useState} from 'react'
import {Link} from 'react-router-dom'

const Nav = function() {
    const dropdownContainer = useRef();
    const [toggleMenu,setToggleMenu] = useState(true);

    const showMenu = (e) => {
        const flag = !toggleMenu;
        setToggleMenu(flag);
       
        if(toggleMenu){
            dropdownContainer.current.classList.add('show');
            return;
        }
        dropdownContainer.current.classList.remove('show');
        
    }

    const displayLogin = () => {
        const modal = document.querySelector('#modal-login');
        modal.classList.add('visible');
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
                            {/* <a href="#"  className="nav__link">home</a> */}
                        </li>
                        <li className="nav__item">
                            <Link to="/gallery" className="nav__link" >
                                gallery
                            </Link>
                            {/* <a href="#"  className="nav__link">gallery</a> */}
                        </li>
                        <li className="nav__item">
                            <Link to="" onClick={(e) => showMenu(e)}  className="nav__link dropdown__btn">
                                event
                            </Link>
                            {/* <a href="#" onClick={(e) => showMenu(e)}  className="nav__link dropdown__btn">event</a> */}
                            <div className="dropdown__container disappear" ref={dropdownContainer}>
                                <div className="dropdown__menu">
                                    <a href="#" className="dropdown__menu--list">event registration</a>
                                    <a href="#" className="dropdown__menu--list">event dashboard</a>
                                    <a href="#" className="dropdown__menu--list">event notice</a>
                                </div>
                            </div>
                        </li>
                        <li className="nav__item">
                            <Link to="/about" className="nav__link" >
                                about us
                            </Link>
                            {/* <a href="#"  className="nav__link">about us</a> */}
                        </li>
                        <li className="nav__item">
                            <Link to="/contact" className="nav__link" >
                                contact us
                            </Link>
                            {/* <a href="#"  className="nav__link">contact</a> */}
                        </li>
                        <li className="nav__item">
                            <a href="#modal-login" onClick={displayLogin}  className="nav__link">login</a>
                        </li>
                    </ul>
                </nav>
            </div>
    );

}

export default Nav