import React from 'react';
import { connect } from 'react-redux';
import {deleteNoticeAction} from '../../../action';
import Toast,{toast} from '../../toast';

class NoticeCard extends React.Component {

    deleteNotice = (id) => {
        this.props.deleteNoticeAction(id).then(
            this.props.toast({
                containerId: "toast-notice",
                toastType: "info",
                message: "Notice deleted",
                showToast:true
            })
        ).catch((err) => {
            console.log("error")
        })
    }
    render(){
        return(
            <>
                <div className="card__container">
                    <div className="card__heading">
                        {this.props.heading}
                        <button className="delete_notice" onClick={() => this.deleteNotice(this.props.id)}>Delete</button>
                    </div>
                    <div className="card__description">
                        {this.props.description}
                    </div>
                </div>
                <Toast />
            </>
        );
    }
    
}

export default connect(null,{deleteNoticeAction,toast})(NoticeCard)