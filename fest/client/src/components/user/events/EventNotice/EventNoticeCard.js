import React from "react";

function EventNoticeCard(props) {
  return (
    <div className="event_notice_main__message" id={props.id}>
      <div className="event_notice_main__message_icon col_sm_2 col_md_2 col_lg_2">
        <img
          className="event_notice_main__message_icon_style"
          src={props.image}
        />
      </div>
      <div className="event_notice_main__message_text col_sm_10 col_md_10 col_lg_10">
        {props.message}
      </div>
      <div className="event_notice_main__message_time">
        {props.date_time}
      </div>
    </div>
  );
}

export default EventNoticeCard;
