import React from 'react'
import ReactDOM from 'react-dom'
import {Field,reduxForm,reset} from 'redux-form'
import {connect} from 'react-redux'

import {signUpAction} from '../../../action'
import {Alert} from '../../Alert'

class Sign extends React.Component {

    state = {
        passwordStateSign:"password",
        alertInfo:false,
        alertErr:false,
        errEmail:"",
        errUserName:"",
        errMobileNo:"",
        errPassword:""
    }
    eyeRef = React.createRef()
    eyeOffRef = React.createRef()

    //Hiding Sign up modal on sucessful signup/submit form
    hideModal = () => {
        const modal = document.querySelector('#modal-signup');
        modal.classList.remove('visible')
    }

    //creating input field for Redux form Field component
    renderInput = ({input,label,type,meta}) => {
        return(
            <div className="form__group--sign">
                <input {...input} type={type} placeholder={label} className="form__input--sign" autoComplete="off" required/>
                <label htmlFor={label} className="form__label">{label}</label>
            </div>
        );
    }

    //creating input field for Redux form Field component
    renderPassword = ({input,label,type,meta}) => {
        return(
            
            <div className="form__group--sign">
                <input {...input} type={type} placeholder={label} className="form__input--sign" autoComplete="off" required/>
                <span ref={this.eyeRef}  className="visible__eye-icon" onClick={this.showPass}>
                    <ion-icon name="eye" class="eye-icon"></ion-icon>
                </span>
                <span  ref={this.eyeOffRef} className="invisible__eye-icon hide" onClick={this.hidePass}>
                    <ion-icon name="eye-off" class="eye-off-icon"></ion-icon>
                </span>
                <label htmlFor={label} className="form__label">{label}</label>
                <div className="password__instruction">Password must be 5 characters long.</div>
            </div>
        );
    }

     //On eye click making password filed 'password' type.
    hidePass = (e) => {
        this.setState({passwordStateSign:"password"});
        this.setState({alertInfo:false,alertErr:false}); // before re-rendering setting it to initial state
        this.eyeOffRef.current.classList.add('hide');
        this.eyeRef.current.classList.remove('hide');
    }

    //On eye click making password filed 'text' type.
    showPass = (e) => {
        this.setState({passwordStateSign:"text"});
        this.setState({alertInfo:false,alertErr:false}); // before re-rendering setting it to initial state
        this.eyeRef.current.classList.add('hide');
        this.eyeOffRef.current.classList.remove('hide');
    }

    


    // Set error state variable to empty
    emptyError = () => {
        this.setState({
            errMobileNo:"",
            errPassword:"",
            errEmail:"",
            errUserName:""
        });
    }

    onSubmit = (formValue) => {
        this.setState({alertInfo:true,alertErr:false});
        this.props.signUpAction(formValue).then(() => {
            alert("Check your email to activate email account");
            this.emptyError();
            this.hideModal();
        }).catch((err) => {
            if(err?.response?.status !== 200){
                this.setState({alertInfo:false,alertErr:true});
            }

            if(err?.response?.data){//Show error message
                this.emptyError();
                err.response.data.errors.forEach((value)=>{
                    if(value.param === "mobileNumber"){
                        this.setState({errMobileNo:value.msg});
                    }
                    if(value.param === "password"){
                        this.setState({errPassword:value.msg});
                    }
                    if(value.param === "email"){
                        this.setState({errEmail:value.msg});
                    }
                    if(value.param === "username"){
                        this.setState({errUserName:value.msg});
                    }
                    
                })
            }else{
                this.setState({alertInfo:false,alertErr:true});
            }

        })
        
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr)=>{
        if(alertInfo){
            return(
                <Alert message="Sign up in the process..." containerId="alert-signup" alertType={"info"} />
            );
        }
        if(alertErr){
            return(
                <Alert message="Something went wrong!" containerId="alert-signup" alertType={"error"} />
            );
        }

        return<></>;
        
    }

    render(){
        return ReactDOM.createPortal(
        <>
            <div className="modal" id="modal-signup" onClick={this.hideModal}>
                <div className="modal__container--sign" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__container--content-sign" >
                        <h4 className="heading--4 form__heading--sign">sign up</h4>
                        <div className="modal__form--sign">
                            <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="name" type="text" component={this.renderInput} label="Name" />

                                <div className="error_msg">{this.state.errMobileNo}</div>
                                <Field name="mobileNumber" type="text" component={this.renderInput} label="Mobile No." />
                                
                                <div className="error_msg">{this.state.errUserName}</div>
                                <Field name="username" type="text" component={this.renderInput} label="Username" />
                                
                                <div className="error_msg">{this.state.errEmail}</div>
                                <Field name="email" type="email" component={this.renderInput} label="Email" />
                                
                                <div className="error_msg">{this.state.errPassword}</div>
                                <Field name="password" type={this.state.passwordStateSign} component={this.renderPassword} label="Password" />
                                
                                <button className="form__button" >sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {this.alertPopup(this.state.alertInfo,this.state.alertErr)}
            </>
            ,
            document.querySelector('#auth')
        );
    }

}

const  afterSubmit = (_, dispatch) =>
  dispatch(reset('signForm'));

export default connect(null,{signUpAction})(reduxForm({
    form:'signForm',
    onSubmitSuccess:afterSubmit
})(Sign));

