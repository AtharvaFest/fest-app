import React from "react";

import Nav from "../../nav";
import Footer from "../../footer";

import EventDateAndCard from './EventDateAndCard'

function EventDashboard() {
  return (
    <div>
      <Nav />
      <div className="after-navigation">
        <div className="event_dashboard__main">
          <EventDateAndCard />
          <EventDateAndCard />
          <EventDateAndCard />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default EventDashboard;
