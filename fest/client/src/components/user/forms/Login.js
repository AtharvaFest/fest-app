import React from 'react'
import ReactDOM from 'react-dom'
import {Field,reduxForm} from 'redux-form'

class Login extends React.Component {

    hideModal = () => {
        const modal = document.querySelector('#modal-login');
        modal.classList.remove('visible')
    }

    renderInput = ({input,label,type,meta}) => {
        return(
            <div className="form__group">
                <input {...input} type={type} placeholder={label} className="form__input" autoComplete="off"/>
                <label htmlFor={label} className="form__label">{label}</label>
            </div>
        );
    }

    onSubmit = formValue => {
        console.log(formValue);
    }

    render(){
        return ReactDOM.createPortal(
            <div className="modal" id="modal-login" onClick={this.hideModal}>
                <div className="modal__container" >
                    <div className="modal__container--content" onClick={(e) => e.stopPropagation()}>
                        <h4 className="heading--4 login__heading">login</h4>
                        <div className="modal__form">
                            <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="email" type="email" component={this.renderInput} label="Email" />
                                <Field name="password" type="password" component={this.renderInput} label="Password" />
                                <button className="form__button" >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>,
            document.querySelector('#login')
        );
    }

}


export default reduxForm({
    form:'loginForm',
})(Login);