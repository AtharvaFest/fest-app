import React from 'react'

import mypdfJPG from "./mypdf.jpg";

function ComponentToPrint() {
  return (
    <div className="certificate__container">
      <img alt="img" style={{ width: "100%"}} src={mypdfJPG}/>
      <div className="certificate__winner_name">Pradeep Ingle</div>
      <div className="certificate__winner_game">Carrom, Chess, Valorant</div>
      <div className="certificate__coordinator_name">Rahul Gupta</div>
    </div>
  )
}

export default ComponentToPrint
