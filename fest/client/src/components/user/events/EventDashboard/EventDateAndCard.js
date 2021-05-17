import React from 'react'

import EventCards from './EventCards'

function EventDateAndCard() {
  return (
    <div className="event_date_and_card_main">
      <div className="event_date_and_card_main__date">20 dec 2021</div>
      <div className="event_date_and_card_main__cards">
        <EventCards />
        <EventCards />
      </div>
    </div>
  )
}

export default EventDateAndCard
