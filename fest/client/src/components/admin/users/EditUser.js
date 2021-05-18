import React from 'react'
import ReactDOM from 'react-dom'
import {Field,reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {editUserAction} from '../../../action'

class EditUser extends React.Component {
    
    showAlertOnSubmit = false;

    state = {
        passwordStateSign:"password",
        errEmail:"",
        errUserName:"",
        errMobileNo:"",
        errPassword:""
    }
    eyeRef = React.createRef()
    eyeOffRef = React.createRef()

    //Hiding Sign up modal on sucessful signup/submit form
    hideModal = () => {
        const modal = document.querySelector('#modal-editUser');
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

    renderCheckBox = ({input,label,type,meta}) => {
        return(
            <div className="form__group--checkbox">
                <label htmlFor={label} className="form_checkbox-label">{label}</label>
                <input {...input} type={type} placeholder={label} className="form__checkbox"/>
                <div className="form__push-toggle">
                    <div className="push-toggle--inner-circle">
                        &nbsp;
                    </div>
                </div>
            </div>
        );
    }

    //creating input field for Redux form Field component
    renderPassword = ({input,label,type,meta}) => {
        
        return(
            
            <div className="form__group--sign">
                <input {...input} type={type} placeholder={label} className="form__input--sign" autoComplete="off"/>
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
            this.props.editUserAction(formValue,this.props.editUserData._id).then((value)=>{
                this.showAlertOnSubmit = true;
                this.emptyError();
                this.hideModal();
                alert("User successfully edited");
            }).catch((err) => {

            if(err?.response?.data){//Show error message
                this.emptyError();
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
                alert("Something went wrong!");
            }
        })
        
    }


    render(){
        return ReactDOM.createPortal(
        <>
            <div className="modal" id="modal-editUser" onClick={this.hideModal}>
                <div className="modal__container--sign" >
                    <div className="modal__container--content-sign" onClick={(e) => e.stopPropagation()}>
                        <h4 className="heading--4 form__heading--sign">Edit</h4>
                        <div className="modal__form--sign">
                            <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="name" type="text" component={this.renderInput}  label="Name" />

                                <div className="error_msg">{this.state.errMobileNo}</div>
                                <Field name="mobileNumber" type="text" component={this.renderInput}  label="Mobile No." />
                                
                                <div className="error_msg">{this.state.errUserName}</div>
                                <Field name="username" type="text" component={this.renderInput}  label="Username" />
                                
                                <div className="error_msg">{this.state.errEmail}</div>
                                <Field name="email" type="email" component={this.renderInput}  label="Email" />
                                
                                <div className="error_msg">{this.state.errPassword}</div>
                                <Field name="password" type={this.state.passwordStateSign} component={this.renderPassword} label="Password" />

                                <Field name="isAdmin" type="checkbox" component={this.renderCheckBox} label="isAdmin" />
                                
                                <button className="form__button" >edit user</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>,
            document.querySelector('#auth')
        );
    }

}


const mapStateToProps = (state,ownProps) => {
    return {
        initialValues:{
            name: ownProps.editUserData.name,
            username: ownProps.editUserData.username,
            email:ownProps.editUserData.email,
            mobileNumber: ownProps.editUserData.mobileNumber,
            isAdmin:ownProps.editUserData.isAdmin
        }
      };
}


export default connect(mapStateToProps,{editUserAction})(reduxForm({
    form:'editForm',
    enableReinitialize: true
})(EditUser));