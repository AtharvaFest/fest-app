import React from 'react'
import {Field,reduxForm,reset} from 'redux-form'
import {connect} from 'react-redux'

import {resetPasswordAction} from '../../../action'
import {Alert} from '../../Alert'

class ResetPassword extends React.Component{

    state = {
        newPasswordState:'password',
        confirmPasswordState:'password',
        errPassword:'',      
        alertErr:false,
        alertInfo:false

    }
    showAlert = false

    //On eye click toggle between password and text type.
    //Instead of two funtion (hide and show like Login) we use single function.
    showHidePass = (id) => {
        if(id==='new-pass'){
            if(this.state.newPasswordState === 'text'){
                this.setState({newPasswordState:'password'});
            }
            if(this.state.newPasswordState === 'password'){
                this.setState({newPasswordState:'text'});
            }
        }
        if(id==='confirm-pass'){
            if(this.state.confirmPasswordState === 'text'){
                this.setState({confirmPasswordState:'password'});
            }
            if(this.state.confirmPasswordState === 'password'){
                this.setState({confirmPasswordState:'text'});
            }
        }
        
        const eye = document.querySelector(`#${id}-eye`);
        const eyeOff = document.querySelector(`#${id}-eyeOff`);
        eye.classList.toggle('hide');
        eyeOff.classList.toggle('hide');   
        this.setState({alertInfo:false,alertErr:false});
        // set alert value false which will not display 
        //alert on re-render due to change in password type     
    }

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
    renderPassword = ({input,label,type,id,meta}) => {
        return(
            <div className="reset-password__form-group">
                
                {this.renderError(meta)}
                <input {...input} type={type} placeholder={label} className="reset-password__input" autoComplete="off" required/>
                <span style={{position:'relative'}} id={`${id}-eye`} onClick={()=>this.showHidePass(id)}>
                    <span className="eye__invisible__svg"></span>
                </span>
                <span style={{position:'relative'}} className="hide" id={`${id}-eyeOff`} onClick={()=>this.showHidePass(id)}>
                    <span className="eye__visible__svg"></span>
                </span>
                <label htmlFor={label} className="form__label">{label}</label>
            </div>
        );
    } 

     // Set error state variable to empty
     emptyError = () => {
        this.setState({
            errPassword:"",
        });
    }

    onSubmit = (formValue) => {
        this.props.resetPasswordAction(formValue).then((value)=>{
            this.showAlert = true
            this.emptyError();
            for(const value in formValue){
                formValue[value] = "";
            }
            this.setState({alertInfo:true,alertErr:false});            
        }).catch((err)=>{
            if(err?.response?.data.error === "expiredLink"){
                this.showAlert = true
                this.setState({alertInfo:false,alertErr:true});                
                return;
            }
            if(err?.response?.data){//Show error message
                this.emptyError();
                err.response.data.errors.forEach(value => {
                    if(value.param === "newPassword"){
                        this.setState({errPassword:value.msg});
                    }
                });
            }
        })
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr)=>{
        if(alertInfo&&this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Password changed successfully" containerId="alert-resetPassword" alertType={"info"} />
            );
        }
        if(alertErr&&this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Incorrect link or it is expired" containerId="alert-resetPassword" alertType={"error"} />
            );
        }

        return<></>;
        
    }

    render(){
        return(
            <>
                <div className="reset-password__container">
                    <div className="reset-password__content">
                        <h4 className="heading--4 form__heading--sign">Reset Password</h4>
                        <div className="reset-password__form-content">
                            <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <div className="error_msg paragraph">{this.state.errPassword}</div>
                                <Field name="newPassword" type={this.state.newPasswordState} component={this.renderPassword} label="New Password" id="new-pass" />
                                <Field name="confirmPassword" type={this.state.confirmPasswordState} component={this.renderPassword} label="Confirm Password" id="confirm-pass" />
                                <button className="form__button reset-pass__btn" >Reset Password</button>
                            </form>
                        </div>                    
                    </div>
                </div>
                {this.alertPopup(this.state.alertInfo,this.state.alertErr)}
            </>
        );
    }

}

const validate = formValue => {
    const errors = {};
  
    if (formValue.newPassword !== formValue.confirmPassword ) {
      errors.newPassword = '*New and Confirm Password must be same';
    }
  
  
    return errors;
  };

const  afterSubmit = (_, dispatch) =>
  dispatch(reset('resetPassword'));

export default connect(null,{resetPasswordAction})(reduxForm({
    form:'resetPassword',
    validate,
    onSubmitSuccess:afterSubmit
})(ResetPassword))
