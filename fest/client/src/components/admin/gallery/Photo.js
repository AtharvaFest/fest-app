import React from 'react';
import {connect} from 'react-redux';

import { baseURL } from '../../../api/baseURL';
import {deletePhotoAction} from '../../../action';
import Toast,{toast} from '../../toast';

class Photo extends React.Component{

    handleDeletePhoto = (imagename) => {
        this.props.deletePhotoAction(imagename)
        .then(() => {
            this.props.toast({
                containerId: "toast-delete-photo",
                toastType: "info",
                message: `Photo successfully deleted`,
                showToast:true
            })
        }).catch((err) => {
            this.props.toast({
                containerId: "toast-delete-photo",
                toastType: "error",
                message: `Something went wrong!`,
                showToast:true
            })
        })
    }

    render(){
        return(
            <>
            <div className="photo__main">
                <div className="photo__container">
                    <img 
                        src={`${baseURL}/photos/${this.props.photo.name}`} 
                        style={{width:'100%',height:'100%'}} 
                        alt={`${this.props.photo.name}`} 
                    />
                </div>
                <div className="photo__delete" onClick={() => this.handleDeletePhoto(this.props.photo.name)}>
                    Delete     
                </div>
            </div>
            <Toast />
            </>
        );
    }
}


export default connect(null,{deletePhotoAction,toast})(Photo)