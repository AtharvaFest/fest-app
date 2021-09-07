import React from 'react'
import {Link} from 'react-router-dom'

class Sidebar extends React.Component{

    showSidebarRef = React.createRef();
    showEventSubMenuRef = React.createRef();
    eventItemRef = React.createRef();
    userItemRef = React.createRef();

    // animation for mobile mode (slide left->right)
    showSidebar = () => {
        this.showSidebarRef.current.classList.toggle('sidebar__container--visible');
        document.querySelector('.sidebar-burger').classList.toggle('toggle__burger');
        
    }

    showEventSubMenu = () =>{
        this.showEventSubMenuRef.current.classList.toggle('event-item__sub-menu-visible')
    }

    componentDidMount(){
        const allMenuItems = document.querySelectorAll('.sidebar__nav--items');
        if(window.location.pathname === '/admin'){
            this.userItemRef.current.classList.add('sidebar__nav--items--active');
        }
        if(window.location.pathname.includes('event')){
            this.eventItemRef.current.classList.add('sidebar__nav--items--active');
        }
        allMenuItems.forEach((item) => { 
            if(item.childNodes[0].getAttribute('href') === window.location.pathname){
                item.classList.add('sidebar__nav--items--active')
                
            }
        })
    }


    render(){
        return(
        <div>
            <div className="sidebar-burger" onClick={this.showSidebar}>
                <div className="sidebar-burger__lines burger__line1"></div>
                <div className="sidebar-burger__lines burger__line2"></div>
                <div className="sidebar-burger__lines burger__line3"></div>
            </div>
            <div className="sidebar__container" ref={this.showSidebarRef}>   
                <div className="admin-panel__heading--container">
                    <div className="admin-panel__heading--content">
                        <div className="admin-panel__heading--1">
                            <h3>admin</h3>
                        </div>
                        <div className="admin-panel__heading--2">
                            <h3>panel</h3>
                        </div>
                    </div>
                </div>
                <div className="sidebar__nav">
                    <div className="sidebar__nav--items" ref={this.userItemRef}>
                        <Link to="/admin" className="item">
                            <span className="nav__icon"><ion-icon name="people-outline" /></span>
                            <span>user</span>
                        </Link>
                    </div>
                    <div className="sidebar__nav--items">
                        <Link to="/admin/gallery" className="item">
                            <span className="nav__icon"><ion-icon name="images-outline" /></span>
                            <span>gallery</span>
                        </Link>
                    </div>
                    <div className="event-item__container">
                        <div className="sidebar__nav--items event-item" ref={this.eventItemRef}>
                            <span className="item" onClick={this.showEventSubMenu}>
                                <span className="nav__icon"><ion-icon name="football-outline" /></span>
                                <span>event</span>
                            </span>
                            </div>
                            <div className="event-item--sub-menu" ref={this.showEventSubMenuRef}>
                                <div className="event-item--sub-menu__item">
                                    <Link to="/admin/event/manage" className="item">
                                        <span>event manage</span>
                                    </Link>
                                </div>
                                <div className="event-item--sub-menu__item">
                                    <Link to="/admin/event/reg" className="item">
                                        <span>event reg.</span>
                                    </Link>
                                </div>
                            </div>
                        
                    </div>
                    
                    <div className="sidebar__nav--items">
                        <Link to="/admin/notice" className="item">
                            <span className="nav__icon"><ion-icon name="notifications-outline" /></span>
                            <span>notice</span>
                        </Link>
                    </div>
                    <div className="sidebar__nav--items">
                        <Link to="/admin/certificate" className="item">
                            <span className="nav__icon"><ion-icon name="trophy-outline" /></span>
                            <span>certificate</span>
                        </Link>
                    </div>
                </div>
                
                
            </div>
        </div>
        );
    }

}

export default Sidebar