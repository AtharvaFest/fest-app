import React from 'react'
import ReactDOM from 'react-dom'
import {Field,reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import {signUpAction} from '../../../action'
import Alert from '../Alert'

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
                <span ref={this.eyeRef}  className="visible__eye-icon hide" onClick={this.hidePassSign}>
                    <ion-icon name="eye" class="eye-icon"></ion-icon>
                </span>
                <span  ref={this.eyeOffRef} className="invisible__eye-icon" onClick={this.showPassSign}>
                    <ion-icon name="eye-off" class="eye-off-icon"></ion-icon>
                </span>
                <label htmlFor={label} className="form__label">{label}</label>
                
            </div>
        );
    }

    hidePassSign = (e) => { //On eye click making password filed 'password' type.
        this.setState({passwordStateSign:"password"})
        this.eyeRef.current.classList.add('hide');
        this.eyeOffRef.current.classList.remove('hide');
    }

    showPassSign = (e) => { //On eye click making password filed 'text' type.
        this.setState({passwordStateSign:"text"})
        this.eyeOffRef.current.classList.add('hide');
        this.eyeRef.current.classList.remove('hide');
    }

    onSubmit = (formValue) => {
        this.props.signUpAction(formValue).then((value) => {
            this.setState({alertInfo:true});
            const alert = document.querySelector('#alert-signup');
            alert.classList.remove('hide-alert'); //Removing hide property
            this.setState({
                errMobileNo:"",
                errPassword:"",
                errEmail:"",
                errUserName:""
            });
            for(const value in formValue){
                formValue[value] = "";
            }
            this.hideModal();
        }).catch((err) => {
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
            }else{
                this.setState({alertErr:true});
                const alert = document.querySelector('#alert-signup');
                alert.classList.remove('hide-alert');
            }

        })
        
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr)=>{
        if(alertInfo){
            return(
                <div id="alert-signup"><Alert message="Sign up successful" containerId="#alert-signup" alertType={"info"} /></div>
            );
        }
        if(alertErr){
            return(
            <div id="alert-signup"><Alert message="Something went wrong!" containerId="#alert-signup" alertType={"error"} /></div>
            );
        }

        return<></>;
        
    }

    render(){
        return ReactDOM.createPortal(
        <>
            <div className="modal" id="modal-signup" onClick={this.hideModal}>
                <div className="modal__container--sign" >
                    <div className="modal__container--content-sign" onClick={(e) => e.stopPropagation()}>
                        <h4 className="heading--4 form__heading--sign">sign up</h4>
                        <div className="modal__form--sign">
                            <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="name" type="text" component={this.renderInput} label="Name" />
                                <div>{this.state.errMobileNo}</div>
                                <Field name="mobileNumber" type="text" component={this.renderInput} label="Mobile No." />
                                <div>{this.state.errUserName}</div>
                                <Field name="username" type="text" component={this.renderInput} label="Username" />
                                <div>{this.state.errEmail}</div>
                                <Field name="email" type="email" component={this.renderInput} label="Email" />
                                <div>{this.state.errPassword}</div>
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
            document.querySelector('#login')
        );
    }

}





export default reduxForm({
    form:'signForm',
})(connect(null,{signUpAction})(Sign));