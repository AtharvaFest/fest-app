import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {Field,reduxForm} from 'redux-form'
import {Alert} from '../../Alert'

import {forgotPasswordAction} from '../../../action'

class ForgotPassword extends React.Component {

    state = {
        passwordState:"password",
        alertInfo:false,
    }
    showAlert=false

    eyeRef = React.createRef()
    eyeOffRef = React.createRef()

   

    //on submit hide login form
    hideModal = () => {
        const modal = document.querySelector('#modal-forgot-password');
        modal.classList.remove('visible')
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


    // Set error state variable to empty
    emptyError = () => {
        this.setState({
            errEmail:""
        });
    }

    onSubmit = formValue => {
        this.showAlert= true;
        this.setState({alertInfo:true,alertErr:false});
        this.props.forgotPasswordAction(formValue).then(() => {
                alert("We've sent password reset instructions on your email")
                this.emptyError();
                formValue.email = ""
                this.hideModal();
            }).catch((err) => {
                this.setState({alertInfo:false,alertErr:false});
                
                if(err?.response?.data){//Show error message
                    this.emptyError();
                    this.setState({errEmail:err.response.data.err});          
                }else{
                    this.showAlert= true;
                    this.setState({alertErr:true,alertInfo:false});
                }
            });
    }

     // TOGGLE BETWEEN INFO AND ERROR ALERTS
     alertPopup=(alertInfo,alertErr)=>{
        if(this.showAlert && alertInfo){
            this.showAlert =false;
            return(
                <Alert message="Please wait.." containerId="alert-forgot-password" alertType={"info"} />
            );
        }
        if(this.showAlert && alertErr){
            this.showAlert =false;
            return(
                <Alert message="Something went wrong!" containerId="alert-forgot-password" alertType={"error"} />
            );
        }

        return<></>;
        
    }

    render(){
        return ReactDOM.createPortal(
            <>
                <div className="modal" id="modal-forgot-password" onClick={this.hideModal}>
                    <div className="modal__container--login" onClick={(e) => e.stopPropagation()}>
                        <div className="modal__container--content-login" >
                            <h4 className="heading--4 form__heading">Forgot Password</h4>
                            <div className="modal__form--login">
                                <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                    <div className="error_msg">{this.state.errEmail}</div>
                                    <Field name="email" type="email" component={this.renderEmail} label="Email" />
                                    <button className="form__button" >Send Reset Instruction</button>
                                </form>
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


export default connect(null,{forgotPasswordAction})(reduxForm({
    form:'forgotPasswordForm'
})(ForgotPassword));


