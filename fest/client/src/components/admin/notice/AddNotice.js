import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {addNoticeAction} from '../../../action';
import Toast,{toast} from '../../toast';

class AddNotice extends React.Component {

    state = {heading:"",description:""}

    hideModal = () => {
        const modal = document.querySelector('#add-notice');
        modal.classList.remove('visible')
    }

    addNotice = () => {
        const formData = {heading:this.state.heading,description:this.state.description}
        this.hideModal();
        this.setState({heading:"",description:""})
        this.props.addNoticeAction(formData).then(() => {
            this.props.toast({
                containerId: "toast-notice",
                toastType: "info",
                message: "Notice added",
                showToast:true
            })
        }).catch((err) => {
            if(err?.response?.status !== 200){
                this.props.toast({
                    containerId: "toast-notice",
                    toastType: "error",
                    message: "Something went wrong",
                    showToast:true
                })                  
            }
        })
    }



    render(){
        
        return (
            ReactDOM.createPortal(
                <>
                <div className="modal" id="add-notice" onClick={this.hideModal}>
                    <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal__sub-container" >
                            <h4 className="heading--4 modal__heading">Add Notice</h4>
                            <div className="modal__content">
                                <div className="form__group">
                                    <input type="text"  value={this.state.heading} onChange={(e) => this.setState({heading:e.target.value})} placeholder="Heading" className="form__input" autoComplete="off" required/>
                                    <label htmlFor="Heading" className="form__label">Heading</label>
                                </div>
                                <div className="form__group">
                                    <input type="text"  value={this.state.description} onChange={(e) => this.setState({description:e.target.value})} placeholder="Description" className="form__input" autoComplete="off" required/>
                                    <label htmlFor="Description" className="form__label">Descrption</label>
                                </div>
                                <button className="add__notice--btn" onClick={this.addNotice}>Add Notice</button>
                            </div>           
                        </div>
                    </div>
                </div>
                <Toast />
            </>
            ,document.querySelector('#crud')
            )
        )
    }
    
}


export default connect(null,{addNoticeAction,toast})(AddNotice)