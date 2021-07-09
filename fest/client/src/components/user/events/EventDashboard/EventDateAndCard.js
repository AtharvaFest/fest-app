import React,{useState} from 'react'
import moment from 'moment'

import EventCards from './EventCards'

function EventDateAndCard(props) {
  const [timeOut,setTimeOut] = useState(new Date('2021','10','05','05','20','30').toISOString());

  const eventCardComponents = () => {
    return props.eventArray.map((event) => {
      return <EventCards key={event._id} event={event}/>
    })  
  } 

  const dayCount = () => {
    const date = new Date('2021','10','05','05','20','30')
    let dateInMilliseconds = date.getTime();
    setInterval(() => {
      dateInMilliseconds =  dateInMilliseconds - 1000

      setTimeOut(new Date(dateInMilliseconds).toISOString());
    },1000)
  }

  return (
    <div className="event_date_and_card_main">
      <div className="event_date_and_card_main__date">
        <div>{moment(props.eventArray[0]?.date).format('LL')}</div>
        <div>{timeOut} days to go{dayCount()}</div>
      </div>
      <div className="event_date_and_card_main__cards">
        {eventCardComponents()}
      </div>
    </div>
  )
}

export default EventDateAndCard
