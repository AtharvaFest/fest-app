import React from "react";
import {connect} from 'react-redux'

import {readEventsAction} from '../../../../action'
import Nav from "../../nav";
import Footer from "../../footer";
import EventDateAndCard from './EventDateAndCard';
import afterNavigation from '../../HOC/afterNavigation';

class EventDashboard extends React.Component {
  getAllSortedDates = () => {
    if(this.props.allEvents === null) return
    const dates = this.props.allEvents.map((event) => event.date)
    const [...uniqueDates] = new Set(dates)
    const sortedDates = uniqueDates.sort((a,b) => new Date(a) - new Date(b))
    return sortedDates
  }
  sortedDateWiseEvent = () => {
    const sortedDates = this.getAllSortedDates()
    let sortedDateWiseEvent
    if(sortedDates){
      sortedDateWiseEvent = [...new Array(sortedDates.length)].map(arr => [])
    }

    if(!this.props.allEvents) return ''
    
    this.props.allEvents.forEach((event) => {
        sortedDates.forEach((date,index) => {
          if(event.date === date){
            sortedDateWiseEvent[index].push(event)
          }
        })
    });

    return sortedDateWiseEvent.map((eventArray,index) => {
      return <EventDateAndCard eventArray={eventArray} key={index} />
    })
  }


  componentDidMount() {
    this.props.readEventsAction();
  }
  render(){
    return (
      <>
        <Nav />
        <div className="after-navigation" style={this.props.minMainContentHeight}>
          <div className="event_dashboard__main">
            {this.sortedDateWiseEvent()}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStatetoProps = (state) => {
  return state.adminCRUDEventReducer
}

export default connect(mapStatetoProps,{readEventsAction})(afterNavigation(EventDashboard));
