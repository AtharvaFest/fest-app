import React from 'react'
import moment from 'moment'

import EventCards from './EventCards'

function EventDateAndCard(props) {

  const eventCardComponents = () => {
    return props.eventArray.map((event) => {
      return <EventCards key={event._id} event={event}/>
    })  
  } 

  

  return (
    <div className="event_date_and_card_main">
      <div className="event_date_and_card_main__date">
        <div>{moment(props.eventArray[0]?.date).format('LL')}</div>
      </div>
      <div className="event_date_and_card_main__cards">
        {eventCardComponents()}
      </div>
    </div>
  )
}

export default EventDateAndCard
