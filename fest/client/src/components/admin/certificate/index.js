import React,{useState} from "react";
import ReactToPdf from "./ReactToPdf";

import Sidebar from '../sidebar/Sidebar';
import ComponentToPrint from "./ComponentToPrint";

const Certificate = () => {
  const ref = React.createRef();
  const [name,setName] = useState("");
  const [events,setEvents] = useState("");
  const [coordinator,setcoordinator] = useState("");
  return (
    <div className="admin-panel__container">
        <Sidebar />
        <div className="admin-panel__section">
            <div className="admin-panel__content">
    <div>
      <div className="cert-form">
        <div className="form__group">
           <input type="text"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="form__input" autoComplete="off" required/>
          <label htmlFor="Name" className="form__label">Name</label>
        </div>
        <div className="form__group">
          <input type="text"  value={events} onChange={(e) => setEvents(e.target.value)} placeholder="Events (eg:- carrom,chess,valorant)" className="form__input" autoComplete="off" required/>
          <label htmlFor="Events" className="form__label">Events</label>
        </div>
        <div className="form__group">
          <input type="text"   value={coordinator} onChange={(e) => setcoordinator(e.target.value)} placeholder="Co-ordinator" className="form__input" autoComplete="off" required/>
          <label htmlFor="Co-ordinator" className="form__label">Co-ordinator</label>
        </div>
        
      </div>

      <ReactToPdf targetRef={ref} filename="certificate.pdf">
        {({ toPdf }) => <button onClick={toPdf} className="generate_btn">Generate pdf</button>}
      </ReactToPdf>
      <div ref={ref}>
        <ComponentToPrint name={name} events={events} coordinator={coordinator} />
      </div>
    </div>
    </div>
    </div>
    </div>

  );
};
export default Certificate;
