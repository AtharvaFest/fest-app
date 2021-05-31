import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {Field,reduxForm,reset} from 'redux-form'

import {forgotPasswordAction} from '../../../action'
import Toast,{toast} from '../../toast'

class ForgotPassword extends React.Component {

    state = {
        passwordState:"password",
        alertInfo:false,
    }
    showAlert=false

    eyeRef = React.createRef()
    eyeOffRef = React.createRef()

   

    //on submit hide forgotPassword form
    hideModal = () => {
        const modal = document.querySelector('#modal-forgot-password');
        modal.classList.remove('visible')
    }

   

    //creating input field for Redux form Field component
    renderEmail = ({input,label,type}) => {
        return(
            <div className="form__group--forgot-passwd">
                <input {...input} type={type} placeholder={label} className="form__input--forgot-passwd" autoComplete="off" required/>
                <label htmlFor={label} className="form__label--forgot-passwd">{label}</label>
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
        this.props.toast({
            containerId: "toast-forgot-password",
            toastType: "info",
            message: "Please wait..",
            showToast:true
        }) 
        this.props.forgotPasswordAction(formValue).then(() => {
                alert("We've sent password reset instructions on your email")
                this.emptyError();
                this.hideModal();
            }).catch((err) => {
                this.props.toast({
                    containerId: "toast-forgot-password",
                    toastType: "error",
                    message: "Something went wrong!",
                    showToast:true
                }) 
                
                if(err?.response?.data){//Show error message
                    this.emptyError();
                    this.setState({errEmail:err.response.data.err});          
                }
            });
    }


    render(){
        return ReactDOM.createPortal(
            <>
                <div className="modal" id="modal-forgot-password" onClick={this.hideModal}>
                    <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal__sub-container" >
                            <h4 className="heading--4 modal__heading">Forgot Password</h4>
                            <div className="modal__content">
                                <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                    <div className="error_msg">{this.state.errEmail}</div>
                                    <Field name="email" type="email" component={this.renderEmail} label="Email" />
                                    <button className="form__forgot-password--button" >Send Reset Instruction</button>
                                </form>
                            </div>           
                        </div>
                    </div>
                </div>
                <Toast />
            </>
            ,document.querySelector('#auth')
        );
    }

}

const  afterSubmit = (_, dispatch) =>
  dispatch(reset('forgotPasswordForm'));

export default connect(null,{forgotPasswordAction,toast})(reduxForm({
    form:'forgotPasswordForm',
    onSubmitSuccess:afterSubmit
})(ForgotPassword));


