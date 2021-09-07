import React from 'react'

import mypdfJPG from "./mypdf.jpg";

function ComponentToPrint(props) {
  return (
    <div className="certificate__container">
      <img alt="img" style={{ width: "100%"}} src={mypdfJPG}/>
      <div className="certificate__winner_name">{props.name}</div>
      <div className="certificate__winner_game">{props.events}</div>
      <div className="certificate__coordinator_name">{props.coordinator}</div>
    </div>
  )
}

export default ComponentToPrint
