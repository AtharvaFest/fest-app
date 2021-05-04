import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {Field,reduxForm} from 'redux-form'
import {Alert} from '../../Alert'

import {loginAction,forgotPasswordAction} from '../../../action'

class Login extends React.PureComponent {

    state = {
        passwordState:"password",
        alertInfo:false,
        alertErr:false,
    }

    eyeRef = React.createRef()
    eyeOffRef = React.createRef()
    showAlert = false
   

    //on submit hide login form
    hideModal = () => {
        const modal = document.querySelector('#modal-login');
        modal.classList.remove('visible')
    }

    //on signup click, display signUp form and hide login form
    displaySignup = (e) => {
        const modalSign = document.querySelector(`#modal-signup`);
        const modalLogin = document.querySelector(`#modal-login`);
        modalSign.classList.add('visible');
        modalLogin.classList.remove('visible')
    }

     //on forgotPassword click, display forgot password form
     displayForgotPassword = (e) => {
        const modalSign = document.querySelector(`#modal-forgot-password`);
        const modalLogin = document.querySelector(`#modal-login`);
        modalSign.classList.add('visible');
        modalLogin.classList.remove('visible')
    }

    //creating input field for Redux form Field component
    renderEmail = ({input,label,type,meta}) => {
        return(
            <div className="form__group--login">
                <input {...input} type={type} placeholder={label} className="form__input--login" autoComplete="off" required/>
                <label htmlFor={label} className="form__label">{label}</label>
            </div>
        );
    }

    //creating input field for Redux form Field component
    renderPassword = ({input,label,type,meta}) => {
        return(
            <div className="form__group--login">
                <input {...input} type={type} placeholder={label} className="form__input--login" autoComplete="off" required/>
                <span ref={this.eyeRef}  className="visible__eye-icon hide" onClick={this.hidePass}>
                    <ion-icon name="eye" class="eye-icon"></ion-icon>
                </span>
                <span  ref={this.eyeOffRef} className="invisible__eye-icon" onClick={this.showPass}>
                    <ion-icon name="eye-off" class="eye-off-icon"></ion-icon>
                </span>
                <label htmlFor={label} className="form__label">{label}</label>
            </div>
        );
    }

    //On eye click making password filed 'password' type.
    hidePass = (e) => {
        this.setState({passwordState:"password"});
        this.setState({alertInfo:false,alertErr:false}); // before re-rendering setting it to initial state
        this.eyeRef.current.classList.add('hide');
        this.eyeOffRef.current.classList.remove('hide');
    }

    //On eye click making password filed 'text' type.
    showPass = (e) => {
        this.setState({passwordState:"text"});
        this.setState({alertInfo:false,alertErr:false}); // before re-rendering setting it to initial state
        this.eyeOffRef.current.classList.add('hide');
        this.eyeRef.current.classList.remove('hide');
    }

       

    onSubmit = formValue => {
        this.props.loginAction(formValue).then((value) => {
                this.showAlert = true
                this.setState({alertInfo:true,alertErr:false});                
                for(const value in formValue){
                    formValue[value] = "";
                }
                this.hideModal();
            }).catch((err) => {
                if(err?.response?.status === 401){
                    this.showAlert = true
                    this.setState({alertErr:true,alertInfo:false});                    
                }
            });
    }

     // TOGGLE BETWEEN INFO AND ERROR ALERTS
     alertPopup=(alertInfo,alertErr)=>{
        if(alertInfo){
            this.showAlert = false
            return(
                <Alert message="Login successful" containerId="alert-login" alertType={"info"} />
            );
        }
        if(alertErr){
            this.showAlert = false
            return(
                <Alert message="Unable to login" containerId="alert-login" alertType={"error"} />
            );
        }

        return<></>;
        
    }

    render(){
        return ReactDOM.createPortal(
            <>
                <div className="modal" id="modal-login" onClick={this.hideModal}>
                    <div className="modal__container--login" onClick={(e) => e.stopPropagation()}>
                        <div className="modal__container--content-login" >
                            <h4 className="heading--4 form__heading">login</h4>
                            <div className="modal__form--login">
                                <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                    <Field name="usernameOrEmail" type="text" component={this.renderEmail} label="Username/Email" />
                                    <Field name="password" type={this.state.passwordState} component={this.renderPassword} label="Password" />
                                    <button className="form__button" >login</button>
                                </form>
                                <a href="#modal-forgot-password" onClick={(e) => this.displayForgotPassword(e)} className="forgot-password" >Forgot password?</a>
                            </div>
                            
                            <div className="sign__btn--container">
                                <a href="#modal-signup" onClick={(e) => this.displaySignup(e)}  className="sign__btn">signup</a>
                            </div>

                        </div>
                    </div>
                </div>

                {this.alertPopup(this.state.alertInfo,this.state.alertErr)}

            </>
            ,document.querySelector('#auth')
        );
    }

}




export default connect(null,{loginAction,forgotPasswordAction})(reduxForm({
    form:'loginForm',
})(Login));

