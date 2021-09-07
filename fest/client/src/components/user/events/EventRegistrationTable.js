import React from "react";
import moment from 'moment';
import {Field,reduxForm,reset} from 'redux-form';
import { connect } from 'react-redux';
import {getEventsForReg,registerEventAction} from '../../../action';
import Toast,{ toast } from '../../toast'
import Payment from "./Payment";

class EventRegistrationTable extends React.Component {

  state = {
    isEventSelected:false,
    price:0,
    events:[]
  }

  
  displayPayment = (e) => {
    const modalInstruction = document.querySelector(`#payment`);
    modalInstruction.classList.add('visible');
}


  handleRegistration = (formValue) => {
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

    let priceAndDiscount = [];
    let totalEvents = [];

    events.forEach(event => {
      priceAndDiscount.push(event.split('-')[1]);
      totalEvents.push(event.split('-')[0])
    })

    let totalPrice = 0;
    priceAndDiscount.forEach(price => {
      let discount = price.split('_')[1];
      let fee = price.split('_')[0]
      let singleEventFee = ((discount/100) * fee);
      let discountedFee = fee - singleEventFee;
      totalPrice += discountedFee;
    })

    


    if(events.length === 0){
      alert('Register the event');
      return
    }else{
      this.setState({events:totalEvents})
      this.setState({price:totalPrice})
      this.displayPayment();
    }

    
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
                        <Field name={`${event.event}-${event.fee}_${event.discount}`} type="checkbox" component={this.EventRegistrationTableCheckbox}  />
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
            {/* {
              this.state.isEventSelected ? 
              <Payment />
               :
               <button className="event__registration_submit">
               submit
             </button>
              
            }  */}
            
          </div>       
        </div>
        </form>
        <Toast />
        <Payment price={ this.state.price} events = {this.state.events} />
      </>
    );    
  }
}

const  afterSubmit = (_, dispatch) =>
  dispatch(reset('registerForm'));

const mapStatetoProps = (state) => {
  return state.userGetEventsReducer
}

export default connect(mapStatetoProps,{getEventsForReg,registerEventAction,toast})(reduxForm({
  form:'registerForm',
  onSubmitSuccess:afterSubmit
})(EventRegistrationTable));