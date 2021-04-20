import React from 'react'
import {Field,reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import {adminLoginAction} from '../../../action'
import {Alert} from '../../Alert'
import history from '../../../history'

class Login extends React.Component{

    state = {
        passwordState:"password",
        alertInfo:false,
        alertErr:false
    }

    eyeRef = React.createRef()
    eyeOffRef = React.createRef()

    //On eye click making password filed 'password' type.
    hidePass = (e) => {
        this.setState({passwordState:"password"});
        this.eyeRef.current.classList.add('hide');
        this.eyeOffRef.current.classList.remove('hide');
    }

    //On eye click making password filed 'text' type.
    showPass = (e) => {
        this.setState({passwordState:"text"});
        this.eyeOffRef.current.classList.add('hide');
        this.eyeRef.current.classList.remove('hide');
    }

    //creating input field for Redux form Field component
    renderEmail = ({input,label,type,meta}) => {
        return(
            <div className="from__group--admin">
                <input {...input} type={type} placeholder={label} className="admin-login__input" autoComplete="off" required/>
                <label htmlFor={label} className="admin-login__label">{label}</label>
            </div>
        );
    }

    //creating input field for Redux form Field component
    renderPassword = ({input,label,type,meta}) => {
        return(
            <div className="from__group--admin">
                <input {...input} type={type} placeholder={label} className="admin-login__input" autoComplete="off" required/>
                <span ref={this.eyeRef}  className="visible__eye-icon hide" onClick={this.hidePass}>
                    <ion-icon name="eye" class="eye-icon"></ion-icon>
                </span>
                <span  ref={this.eyeOffRef} className="invisible__eye-icon" onClick={(e) => this.showPass(e)}>
                    <ion-icon name="eye-off" class="eye-off-icon"></ion-icon>
                </span>
                <label htmlFor={label} className="admin-login__label">{label}</label>
            </div>
        );
    }

    onSubmit = (formValue,onSubmitProps) => {
        this.props.adminLoginAction(formValue).then((value) => {
                for(const value in formValue){
                    formValue[value] = "";
                }
                this.setState({alertInfo:true,alertErr:false});
                history.push('/admin')
            }).catch((err) => {
                if(err?.response?.status === 401){
                    this.setState({alertErr:true,alertInfo:false});
                }
            });
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr)=>{
        if(alertInfo){
            return(
                <Alert message="Login successful" containerId="alert-adminLogin" alertType={"info"} />
            );
        }
        if(alertErr){
            return(
                <Alert message="Unable to login" containerId="alert-adminLogin" alertType={"error"} />
            );
        }

        return<></>;
        
    }


    render(){
        return(
        <>
            <div className="admin-login__background">
                <div className="admin-login__container">
                    <div className="admin-login__form ">
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
                            <Field name="usernameOrEmail" type="text" component={this.renderEmail} label="Username/Email" />
                            <Field name="password" type={this.state.passwordState} component={this.renderPassword} label="Password" />
                            <button className="admin-login__btn" >login</button>
                        </form>
                    </div>
                    <div className="admin-login__title">
                        <div className="admin-login__heading">
                            <h1 className="admin-login__heading--1">Admin Login</h1>
                            <h2 className="admin-login__heading--2">Login to enter admin panel</h2>
                        </div>
                        
                    </div>
                </div>
            </div>
    
            {this.alertPopup(this.state.alertInfo,this.state.alertErr)}
        </>
        );
    }

}




export default reduxForm({
    form:'adminLoginForm'
})(connect(null,{adminLoginAction})(Login))
