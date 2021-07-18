import React from 'react';
import {connect} from 'react-redux';

import Sidebar from '../../sidebar/Sidebar';
import Logout from '../../auth/Logout';
// import history from '../../../../history';

class EventReg extends React.Component{

    searchHandler = () => {
        const allEvents = this.state.prePropAllEvents;
        const searchedEvents = allEvents.filter((event)=>{
            let eventStatus = false;
            const eventKeys = Object.keys(event);
            
            eventKeys.forEach((value)=>{
                if(value === '_id') return

                if(event[value].toString().toLowerCase().includes(this.state.search.toString().trim().toLowerCase())){
                    eventStatus = true
                }
            })
            return eventStatus === true
        })
        this.setState({allEvents:searchedEvents})
    }

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="admin-panel__section">
                        <div className="admin-panel__content">
                            <div className="admin-panel__navbar">
                                <div className="admin-panel__navbar-right">                                   
                                    <Logout />
                                </div>  
                            </div>
                            <div className="admin-panel__header-section">
                                <div className="search__container">   
                                    <input  type="text" placeholder="Search" value="sd" onChange={(e)=>this.setState({search:e.target.value})} onKeyPress={this.enterPressed} className="search__box" />
                                    <span className="search__icon">
                                        <ion-icon name="search-outline" ></ion-icon>
                                    </span>
                                </div>
                            </div>  
                            <div className="shadow__container">
                                    <div id="shadow_overlay_top"></div>
                                    <div id="shadow_overlay_left"></div>
                                    <div id="shadow_overlay_right"></div>
                                    <div id="shadow_overlay_bottom"></div>
                                <div className="table__content">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


 
export default connect(null)(EventReg)