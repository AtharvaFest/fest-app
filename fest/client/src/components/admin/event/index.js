import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Sidebar from '../sidebar/Sidebar'
import {createEventsAction,readEventsAction,deleteEventAction,deleteAllEventAction} from '../../../action'
import Logout from '../auth/Logout'
import history from '../../../history'

class Event extends React.Component{
    deleteCount = 0;
    state = {search:'',prePropAllEvents:'',allEvents:''}
    

    deleteEvent = (id) => {
        this.deleteCount += 1;
        if(this.deleteCount < 4){
            if(window.confirm("Delete event?")){
                this.props.deleteEventAction(id);
            }
        }else{
            this.props.deleteEventAction(id);
        }
        
    }

    deleteAllEvents = (id) => {
        if(window.confirm("Delete all events?")){
            this.props.deleteAllEventAction().then(()=>{

            }).catch((err) =>{
                history.push('/adminlogin')
            })
        }
    }


    toBase64(arr) {
        return btoa(
          arr.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
      }

    getAllEventData = () =>{
        if(this.state.allEvents === null) {
            return (<div className="no-content">Loading...</div>);
        }

        if(this.state.allEvents.length === 0) {
            return (<div className="no-content">no event found</div>);
        }


        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>sr.</th>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Entry Fee</th>
                        <th>Prize Worth</th>
                        <th>Discount</th>
                        <th>Edit</th>
                        <th><span onClick={this.deleteAllEvents} className="delete__all">delete all</span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.state.allEvents.map((event,index)=>{
                        return(
                            <tr key={event._id}>
                                <td>{index+1}</td>
                                <td>{event.event}</td>
                                <td>{moment(event.date).format('LL')}</td>
                                <td>{event.fee}</td>
                                <td>{event.prize}</td>
                                <td>{event.discount}%</td>
                                {/* <td><img src={`data:image/jpeg;base64,${this.toBase64(event.image)}`} /></td> */}
                                <td>
                                    <a href={`/admin/event/edit/${event._id}`} className="edit-btn">
                                        <ion-icon name="create-outline"></ion-icon>
                                    </a>
                                </td>
                                <td>
                                    <span className="delete-btn" onClick={()=>this.deleteEvent(event._id)}>
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </span>
                                </td>
                            </tr>
                        );
                    })
                    }
                    
                </tbody>
            </table>
        );
    }

    enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.searchHandler()
        } 
    }

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

    componentDidMount(){
        this.props.readEventsAction()
        .then(()=>{
            this.setState({allEvents:this.props.allEvents})
        })
        .catch(()=>{history.push('/adminlogin')})
    }

    static getDerivedStateFromProps(props, state){
        // the state only changes when props value get change with respect to previous props,
        // and prop value only gets changes when 'event' is edited.
       if(props.allEvents !== state.prePropAllEvents){
           return {
               prePropAllEvents:props.allEvents,allEvents:props.allEvents
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
                                <a href="/admin/event/create" className="add-event">Add Event</a>    
                                <div className="search__container">   
                                    <input  type="text" placeholder="Search" value={this.state.search} onChange={(e)=>this.setState({search:e.target.value})} onKeyPress={this.enterPressed} className="search__box" />
                                    <span className="search__icon" onClick={this.searchHandler} >
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
                                    {this.getAllEventData()}
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
    return state.adminCRUDEventReducer
}

 
export default connect(mapStatetoProps,{createEventsAction,readEventsAction,deleteEventAction,deleteAllEventAction})(Event)