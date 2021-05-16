import React from 'react'
import { connect } from 'react-redux'
import {Field,reduxForm,reset} from 'redux-form'
import moment from 'moment'
import DatePicker from "react-datepicker";

import {createEventsAction,readEventsAction} from '../../../action'
import {Alert} from '../../Alert'

class CreateEvent extends React.Component {

    state = {
            alertInfo:false,
            alertEventExist:false,
            alertErr:false,
        }

    
    
    showAlert = false

    renderError({ error}) {
        if (error) {
          return (
            <div>
              <div className="error_msg paragraph">{error}</div>
            </div>
          );
        }
      }

    //creating input field for Redux form Field component
    renderInput = ({input,label,type,meta}) => {
        return(
            <div className="create-event__input--group">
                {this.renderError(meta)}
                <input {...input} type={type} placeholder={label} className="create-event__input" autoComplete="off" required/>
                <label htmlFor={label} className="create-event__label">{label}</label>
            </div>
        );
    }

    renderDate = ({input,label,meta}) => {
        // when form is submited then field become empty and if user try to submit empty form
        // the date value is set as invalid date and due to which moment function gives error.
        // that's why we have to check that user don't send empty form.
        if(input.value.toString() === 'Invalid Date'){
            return(
                <div className="create-event__input--group">
                    {this.renderError(meta)}
                    <DatePicker 
                    {...input} 
                    dateFormat="dd/MM/yyyy"   
                    placeholderText={label} 
                    autoComplete="off"
                    className="create-event__date-input"
                    calendarClassName="calender"
                    minDate={new Date()}
                    required
                    />
                    <label htmlFor={label} className="create-event__date-label">{label}</label>
                </div>
                );
        }
        return(
        <div className="create-event__input--group">
            {this.renderError(meta)}
            <DatePicker             
            {...input} 
            dateFormat="dd/MM/yyyy"   
            placeholderText={label} 
            selected={input.value ? moment(input.value, "DD MM YYYY")._d: null} 
            autoComplete="off"
            className="create-event__date-input"
            calendarClassName="calender"
            minDate={new Date()}
            required
            />
            <label htmlFor={label} className="create-event__date-label">{label}</label>
        </div>
        );
    }

   


    onSubmit = formValue => {
        let submitFlag = true;

        this.props.allEvents.forEach((event)=>{
            if(event.event === formValue.event){
                submitFlag = false;
                this.showAlert = true;
                this.setState({alertInfo:false,alertErr:false,alertEventExist:false});
                this.setState({alertErr:false,alertInfo:false,alertEventExist:true});                   
            }
        })

        if(submitFlag){
            // sometimes date value we get in string as dd/mm/yyyy. 
            //therefore to get always date value in date type we are doing following conversion
            formValue.date = moment(formValue.date, "DD MM YYYY")._d;
            this.props.createEventsAction(formValue).then((value) => {
                this.showAlert = true;
                this.setState({alertInfo:false,alertErr:false,alertEventExist:false});  
                this.setState({alertInfo:true,alertErr:false,alertEventExist:false});        
            }).catch((err) => {
                this.showAlert = true;
                this.setState({alertInfo:false,alertErr:false,alertEventExist:false});
                this.setState({alertErr:true,alertInfo:false,alertEventExist:false});                   
            });
        }
       
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr,alertEventExist)=>{
        if(alertInfo && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Event added" containerId="alert-create-event" alertType={"info"} />
            );
        }
        if(alertEventExist && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="The event has been already added" containerId="alert-create-event" alertType={"error"} />
            );
        }
        if(alertErr && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Something went wrong!" containerId="alert-create-event" alertType={"error"} />
            );
        }

        return<></>;
        
    }

    componentDidMount(){
        this.props.readEventsAction();
    }

    render(){
        return(
            <>
            <div className="create-event__section">
                <div className="create-event__header">
                    <a href="/admin/event/manage" className="create-event__header--btn">
                        <ion-icon name="chevron-back-outline" class="chevron"></ion-icon>
                    </a>
                    <h4 className="heading--4 create-event__heading">Add Event</h4>
                </div>
                <div className="create-event__container" >
                    <div className="" >
                        <div className="" >
                            <div className="">
                                 <form className="" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                 {/* <div className="">Error that is shown here</div> */}
                                    <Field name="event" type="text" component={this.renderInput} label="Event" />

                                    {/* <div className="">Error that is shown here</div> */}
                                    <Field name="date" component={this.renderDate} label="Date" />

                                    {/* <div className="">Error that is shown here</div> */}
                                    <Field name="fee" type="text" component={this.renderInput} label="Entry Fee" />

                                    <Field name="prize" type="text" component={this.renderInput} label="Prize Worth" />

                                    {/* <div className="">Error that is shown here</div> */}
                                    <Field name="discount" type="text" component={this.renderInput} label="Discount" />
                                    <button className="create-event__btn" >Add Event</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {this.alertPopup(this.state.alertInfo,this.state.alertErr,this.state.alertEventExist)}
            </>
        );
    }

}

const validate = (formValue) => {
    const errors = {};  

    if (isNaN(formValue.fee) && formValue.fee !== undefined) {
      errors.fee = 'Fee must be number';
    }

    if (isNaN(formValue.prize) && formValue.prize !== undefined) {
        errors.prize = 'Prize must be number';
      }

    if (isNaN(formValue.discount) && formValue.discount !== undefined) {
        errors.discount = 'Discount must be number';
      }
  
  
    return errors;
  };

const  afterSubmit = (_, dispatch) =>
  dispatch(reset('createEventForm'));

const mapStatetoProps = (state) => {
    return state.adminCRUDEventReducer
}
 

export default connect(mapStatetoProps,{createEventsAction,readEventsAction})(reduxForm({
    form:'createEventForm',
    onSubmitSuccess:afterSubmit,
    validate
})(CreateEvent));