import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {Field,reduxForm,reset} from 'redux-form'

import Nav from "../nav";
import Footer from "../footer";
import AuthInstructions from './AuthInstructions'
import {loginAction,forgotPasswordAction} from '../../../action'
import history from  '../../../history';
import Toast,{toast} from '../../toast';
import afterNavigation from '../HOC/afterNavigation'

class Login extends React.PureComponent {

    state = {
        passwordState:"password",
        alertInfo:false,
        alertErr:false
    }

    eyeRef = React.createRef()
    eyeOffRef = React.createRef()
    showAlert = false

   

    //on forgotPassword click, display forgot password form
    displayForgotPassword = (e) => {
        const modalForgotPass = document.querySelector(`#modal-forgot-password`);
        modalForgotPass.classList.add('visible');
    }


     //on Instructions click, display Instruction model
     displayInstructions = (e) => {
        const modalInstruction = document.querySelector(`#checkout-instruction`);
        modalInstruction.classList.add('visible');
    }

    //creating input field for Redux form Field component
    renderEmail = ({input,label,type,meta}) => {
        return(
            <div className="form__group">
                <input {...input} type={type} placeholder={label} className="form__input" autoComplete="off" required/>
                <label htmlFor={label} className="form__label">{label}</label>
            </div>
        );
    }

    //creating input field for Redux form Field component
    renderPassword = ({input,label,type,meta}) => {
        return(
            <div className="form__group">
                <input {...input} type={type} placeholder={label} className="form__input" autoComplete="off" required/>
                <span ref={this.eyeRef} style={{position:'relative'}}  onClick={this.showPass}>
                    <span className="eye__invisible__svg"></span>
                </span>
                <span  ref={this.eyeOffRef} style={{position:'relative'}} className="hide" onClick={this.hidePass}>
                    <span className="eye__visible__svg"></span>
                </span>
                <label htmlFor={label} className="form__label">{label}</label>
            </div>
        );
    }

    //On eye click making password filed 'password' type.
    hidePass = (e) => {
        this.setState({passwordState:"password"});
        this.eyeOffRef.current.classList.add('hide');
        this.eyeRef.current.classList.remove('hide');
    }

    //On eye click making password filed 'text' type.
    showPass = (e) => {
        this.setState({passwordState:"text"});
        this.eyeRef.current.classList.add('hide');
        this.eyeOffRef.current.classList.remove('hide');
    }

       

    onSubmit = formValue => {
        this.props.loginAction(formValue).then(() => {
                alert("You are successfully loggedin.\nKnow you can register the events");
                history.push("/event/registration")     
            }).catch((err) => {
                if(err?.response?.status === 401){
                    this.props.toast({
                        containerId: "toast-login",
                        toastType: "error",
                        message: "Unable to login",
                        showToast:true
                    })                  
                }
            });
    }

    

    render(){
        return(
            <>
            <Nav />
            <div className="after-navigation" style={this.props.minMainContentHeight}>
                <div className="form__section" >
                    <div className="intruction__model">
                        <a href="#checkout-instruction" onClick={(e) => this.displayInstructions(e)}>
                            Checkout Instructions
                        </a>
                    </div>
                    <div className="form__main" >
                        <div className="form__container--form">
                            <div className="form__content" >
                                <div className="form--login">
                                    <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                        <Field name="usernameOrEmail" type="text" component={this.renderEmail} label="Username/Email" />
                                        <Field name="password" type={this.state.passwordState} component={this.renderPassword} label="Password" />
                                        <button className="form__btn" >login</button>
                                    </form>
                                    <a href="#modal-forgot-password" onClick={(e) => this.displayForgotPassword(e)} className="forgot-password" >Forgot password?</a>
                                </div>
                                
                                <div className="sign__btn--container">
                                    <Link to="signup" className="sign__btn">Signup</Link>
                                </div>

                            </div>
                        </div>
                        <div className="form__container--instructions">
                            <div className="form__login--instructions-background">

                            </div>  
                            <div className="form__login--instructions">
                                <ul className="instruction__list">
                                    <p>Instructions</p>
                                    <li>
                                    The students that are from Atharva college register using Atharva G-suit id.
                                    </li>
                                    <li>
                                    Students registered using Atharva email id will only be allowed to play intra-college events.
                                    </li>
                                    <li>Instruction for signup 1</li>
                                    <li>Instruction for signup 1</li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <AuthInstructions />
            <Toast />

            </>
        );
    }

}

const  afterSubmit = (_, dispatch) =>
  dispatch(reset('loginForm'));


export default connect(null,{loginAction,forgotPasswordAction,toast})(reduxForm({
    form:'loginForm',
    onSubmitSuccess:afterSubmit
})(afterNavigation(Login)));

