import React from "react";


function EventCards(props) {
  const toBase64 = (arr) => {
    return btoa(
      arr.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  return (
    <div className="event__card__main">
      <div className="event__card__main_inner">
        <div className="event__card__main__front">
          <div className="event__card__main_img">
            <img
              src={`data:image/jpeg;base64,${toBase64(props.event.image)}`}
              className="event__card__main_img_style"
              alt="event cards"
            ></img>
          </div>
          <div className="event_game_name">Game : {props.event.event}</div>
          <div className="event_game_price">Prize : {props.event.prize} Rs</div>
          <div className="event_game_fee">Fee : {props.event.fee} Rs</div>
          <div className="event_game_fee">Discount : {props.event.discount} %</div>
        </div>
        <div className="event__card__main__back">
          <button className="event__card__main__back__reg_button">
            <span>Register</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCards;
