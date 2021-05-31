import React from 'react'
import {Field,reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import {adminLoginAction} from '../../../action'
import history from '../../../history'
import Toast,{ toast } from '../../toast'

class Login extends React.Component{

    state = {
        passwordState:"password",
        alertInfo:false,
        alertErr:false
    }

    eyeRef = React.createRef()
    eyeOffRef = React.createRef()

    //On eye click making password filed 'password' type.
    hidePass = () => {
        this.setState({passwordState:"password"});
        this.setState({alertErr:false,alertInfo:false});
        this.eyeRef.current.classList.add('hide');
        this.eyeOffRef.current.classList.remove('hide');
    }

    //On eye click making password filed 'text' type.
    showPass = () => {
        this.setState({passwordState:"text"});
        this.setState({alertErr:false,alertInfo:false});
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
                <span ref={this.eyeOffRef} style={{position:'relative'}}  onClick={this.showPass}>
                    <span className="eye__invisible__svg"></span>
                </span>
                <span  ref={this.eyeRef} style={{position:'relative'}} className="hide" onClick={this.hidePass}>
                    <span className="eye__visible__svg"></span>
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
                history.push('/admin')
            }).catch((err) => {
                if(err?.response?.status === 401){
                    this.props.toast({
                        containerId: "toast-adminLogin",
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
            <Toast />
        </>
        );
    }

}




export default reduxForm({
    form:'adminLoginForm'
})(connect(null,{adminLoginAction,toast})(Login))
