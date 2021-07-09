import React from 'react'
import {Field,reduxForm,reset} from 'redux-form'
import {connect} from 'react-redux'

import {signUpAction} from '../../../action'
import Nav from "../nav";
import Footer from "../footer";
import AuthInstructions from './AuthInstructions';
import Toast,{toast} from '../../toast'
import afterNavigation from '../HOC/afterNavigation'

class Sign extends React.Component {
    showAlert = false

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


    //creating input field for Redux form Field component
    renderInput = ({input,label,type}) => {
        return(
            <div className="form__group">
                <input {...input} type={type} placeholder={label} className="form__input" autoComplete="off" required/>
                <label htmlFor={label} className="form__label">{label}</label>
            </div>
        );
    }

    //creating input field for Redux form Field component
    renderPassword = ({input,label,type}) => {
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

     //on Instructions click, display Instruction model
     displayInstructions = (e) => {
        const modalInstruction = document.querySelector(`#checkout-instruction`);
        modalInstruction.classList.add('visible');
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
        this.props.toast({
            containerId: "toast-signup",
            toastType: "info",
            message: "Sign up in the process...",
            showToast:true
        }) 
        this.emptyError();
        this.props.signUpAction(formValue).then(() => {
            alert("Check your email to activate email account");
        }).catch((err) => {
            if(err?.response?.status !== 200){
                this.props.toast({
                    containerId: "toast-signup",
                    toastType: "error",
                    message: "Something went wrong!",
                    showToast:true
                })
            }

            if(err?.response?.data){//Show error message
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
            }

        })
        
    }

    render(){
        return (
        <>
            <Nav />
            <div className="after-navigation" style={this.props.minMainContentHeight}>
                <div className="form__section" >
                    <div className="intruction__model">
                        <a href="#checkout-instruction" onClick={(e) => this.displayInstructions(e)}>
                            Checkout Instructions
                        </a>
                    </div>
                    <div className="form__main">
                        <div className="form__container--form" >
                                <div className="form__content">
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
                                        
                                        <button className="form__btn" >sign up</button>
                                    </form>
                                </div>
                        </div>
                        <div className="form__container--instructions">
                            <div className="form__signup--instructions-background">

                            </div>  
                            <div className="form__signup--instructions">
                                
                                <ul className="instruction__list">
                                    <p>Instructions</p>
                                    <li>
                                        The students that are from Atharva college register using Atharva G-suit id
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
  dispatch(reset('signForm'));

export default connect(null,{signUpAction,toast})(reduxForm({
    form:'signForm',
    onSubmitSuccess:afterSubmit
})(afterNavigation(Sign)));

