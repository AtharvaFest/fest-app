import React from "react";
import moment from 'moment';
// import EventRegistrationTableCheckbox from "./EventRegistrationTableCheckbox";
import {Field,reduxForm,reset} from 'redux-form';
import { connect } from 'react-redux';
import {getEventsForReg,registerEventAction} from '../../../action';

class EventRegistrationTable extends React.Component {

  handleRegistration = (formValue) => {
    // e.preventDefault();
    // // console.log
    // console.log(formValue.length);
    const isFormValueEmpty = formValue && Object.keys(formValue).length === 0 && formValue.constructor === Object;
    if(isFormValueEmpty) {
      alert('Register the event');
      return
    }
    const formValueKeys = Object.keys(formValue);
    let events = []
    formValueKeys.forEach((event) => {
      if(formValue[event] === true){
        events.push(event);
      }
    })

    if(events.length === 0){
      alert('Register the event');
      return
    }

    this.props.registerEventAction(events).catch((err) => {
      console.log(err.response);
    })
  }

  EventRegistrationTableCheckbox = ({input,type}) => {
    return (
      <div className="checkbox__container">
        <input {...input} className="checkbox__design" type={type} id="checkbox" />
      </div>
    );
  }

  getAllEvent = () => {
    if(this.props.allEventsForReg === null) {
        return (<div className="no-content">Loading...</div>);
    }

    if(this.props.allEventsForReg.length === 0) {
        return (<div className="no-content">no event found</div>);
    }

    return(
      <table className="fl-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Fee</th>
                <th>Prize</th>
                <th>Dicount</th>
                <th>Register</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.allEventsForReg.map((event) => {
                  return(
                    <tr key={event._id}>
                      <td>{event.event}</td>
                      <td>{moment(event.date).format('LL')}</td>
                      <td>{event.fee}</td>
                      <td>{event.prize}</td>
                      <td>{event.discount}%</td>
                      <td>
                        {" "}
                        <Field name={event.event} type="checkbox" component={this.EventRegistrationTableCheckbox}  />
                        {" "}
                      </td>
                    </tr>
                  )
                })
                
              }
              
            </tbody>
          </table>
    );

  }

  componentDidMount() {
    this.props.getEventsForReg();
  }

  render() {
    return (
      <>
      <form onSubmit={this.props.handleSubmit(this.handleRegistration)}>
        <div className="table-wrapper">
          {this.getAllEvent()}
        </div>
        <div className="event__registration_submit_div">
          <div>
            <button className="event__registration_submit">
              submit
            </button> 
          </div>       
        </div>
        </form>
      </>
    );    
  }
}

const  afterSubmit = (_, dispatch) =>
  dispatch(reset('registerForm'));

const mapStatetoProps = (state) => {
  return state.userGetEventsReducer
}

export default connect(mapStatetoProps,{getEventsForReg,registerEventAction})(reduxForm({
  form:'registerForm',
  onSubmitSuccess:afterSubmit
})(EventRegistrationTable));