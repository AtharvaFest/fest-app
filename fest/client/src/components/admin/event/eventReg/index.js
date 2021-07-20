import React from 'react';
import {connect} from 'react-redux';

import Sidebar from '../../sidebar/Sidebar';
import Logout from '../../auth/Logout';
import {readEventsRegAction} from '../../../../action'

import history from '../../../../history';

class EventReg extends React.Component{

    state = {search:'',prePropEventRegData:'',eventRegData:''}

    searchHandler = () => {
        const eventRegData = this.state.prePropEventRegData;
        const searchedEvents = eventRegData.map((eventReg)=>{
            
            if(eventReg.event.toString().toLowerCase().includes(this.state.search.toString().trim().toLowerCase())){
                return eventReg;
            }

            const users = eventReg.users.filter((user) => {
                let userStatus = false;
                const userKeys = Object.keys(user.user);
                userKeys.forEach((value)=>{
                    if(value === '_id') return
    
                    if(user.user[value].toString().toLowerCase().includes(this.state.search.toString().trim().toLowerCase())){
                        userStatus = true
                    }
                })

                return userStatus;
            })

            if(users.length !== 0){
                eventReg.users = users;
                return eventReg
            }

            return null;
        })
        this.setState({eventRegData:searchedEvents})
    }

    enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.searchHandler()
        } 
    }

    getAllRegistrations = () => {
        if(this.state.eventRegData === null) {
            return (<div className="no-content">Loading...</div>);
        }

        if(this.state.eventRegData.length === 0) {
            return (<div className="no-content">no event found</div>);
        }

        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Event Info.</th>
                        <th>User</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Mobile No.</th>
                        <th>Discounted Fee</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.eventRegData.map((eventReg,index)=>{
                        if(eventReg === null) return null
                        return(
                            <React.Fragment key={eventReg._id}>
                            <tr>
                                <td rowSpan={eventReg.users.length+1} >
                                   <strong>{eventReg.event}</strong><br/>
                                </td>
                                <td>{eventReg.users[0].user.user}</td>
                                <td>{eventReg.users[0].user.username}</td>
                                <td>{eventReg.users[0].user.email}</td>
                                <td>{eventReg.users[0].user.mobileNumber}</td>
                                <td>{eventReg.users[0].user.discountedFee}</td>
                            </tr>
                            {
                                eventReg.users.map((user,index) => {
                                    return(
                                        <tr key={`${eventReg._id}${index}`} >
                                            <td>{user.user.user}</td>
                                            <td>{user.user.userName}</td>
                                            <td>{user.user.email}</td>
                                            <td>{user.user.mobileNumber}</td>
                                            <td>{user.user.discountedFee}</td>
                                        </tr>
                                    )
                                    
                                })
                            }
                            
                            </React.Fragment>
                        );
                    })
                }

                
                    
                </tbody>
            </table>
        );
    }

    componentDidMount(){
        this.props.readEventsRegAction()
        .then(()=>{
            this.setState({eventRegData:this.props.eventRegData})
        })
        .catch(()=>{history.push('/adminlogin')})
    }

    static getDerivedStateFromProps(props, state){
        // the state only changes when props value get change with respect to previous props,
        // and prop value only gets changes when 'event' is edited.
       if(props.eventRegData !== state.prePropEventRegData){
           return {
               prePropEventRegData:props.eventRegData,eventRegData:props.eventRegData
            }
       }
       return null
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
                                    <input  type="text" placeholder="Search" value={this.state.search} onChange={(e)=>this.setState({search:e.target.value})} onKeyPress={this.enterPressed} className="search__box" />
                                    <span className="search__icon" onClick={this.searchHandler}>
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
                                    {this.getAllRegistrations()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStatetoProps = (state) => {
    return state.adminCRUDEventRegReducer
}

 
export default connect(mapStatetoProps,{readEventsRegAction})(EventReg)