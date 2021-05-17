import React from "react";

import eventCardImg from "../../../../assets/image/head--1.webp";

function EventCards() {
  return (
    <div className="event__card__main">
      <div className="event__card__main_inner">
        <div className="event__card__main__front">
          <div className="event__card__main_img">
            <img
              src={eventCardImg}
              className="event__card__main_img_style"
            ></img>
          </div>
          <div className="event_game_name">Game : Valorant</div>
          <div className="event_game_price">Price : 500 Rs</div>
          <div className="event_game_fee">Fee : 50 Rs</div>
        </div>
        <div className="event__card__main__back">
          <button class="event__card__main__back__reg_button">
            <span>Register</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCards;
