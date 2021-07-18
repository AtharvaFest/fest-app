import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Toast,{toast} from '../../toast';

import {addPhotoAction} from '../../../action';


class AddPhoto extends React.Component {

    state = {
        selectedFile: null,
        fileName: 'No file chosen'
    };
    
    fileRef = React.createRef();

    hideModal = () => {
        const modal = document.querySelector('#add-photo');
        modal.classList.remove('visible')
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
        if(event.target.files.length !== 0) {

            // Get the selected file
            const [file] = event.target.files;
            // Get the file name and size
            const { name: fileName, size } = file;
            // Convert size in bytes to kilo bytes
            const fileSize = (size / 1000).toFixed(2);
            // Set the text content
            const fileNameAndSize = `${fileName} - ${fileSize}KB`;
            
            this.setState({fileName:fileNameAndSize})
        }else{
            this.setState({fileName:'No file chosen'})
        }
        
        
    };

    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("photo",this.state.selectedFile);
        this.fileRef.current.value = '';
        this.setState({fileName:'No file chosen',selectedFile:null});
        this.hideModal();
        this.props.addPhotoAction(formData)
        .then(() => {
            this.props.toast({
                containerId: "toast-add-photo",
                toastType: "info",
                message: `Photo successfully added`,
                showToast:true
            })
        }).catch(err => {
            if(err?.response?.status === 400){
                this.props.toast({
                    containerId: "toast-add-photo",
                    toastType: "error",
                    message: `${err.response.data.error}`,
                    showToast:true
                })
            }else{
                this.props.toast({
                    containerId: "toast-add-photo",
                    toastType: "error",
                    message: `Something went wrong!`,
                    showToast:true
                })
            }
        })
        
    }


    render(){
        return (
            ReactDOM.createPortal(
                <>
                <div className="modal" id="add-photo" onClick={this.hideModal}>
                    <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal__sub-container" >
                            <h4 className="heading--4 modal__heading">Add Photo</h4>
                            <div className="modal__content">
                                <div>
                                    <form onSubmit={this.onSubmit}>
                                        {/* <input type="file" ref={this.fileRef} onChange={this.onFileChange} /> */}
                                        <div className="upload-photo__container">
                                            <div className="file-input__container">
                                                <div className="file-input">
                                                    <input type="file" ref={this.fileRef} onChange={this.onFileChange} id="file" className="file" />
                                                    <label htmlFor="file" className="file-label">
                                                        Select file
                                                    </label>
                                                </div>
                                                <p className="file-name">{this.state.fileName}</p>
                                                    
                                            </div>
                                            <div className="upload-photo--btn__container">
                                                <button className="upload-photo--btn" type="submit">Upload</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>     
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


export default connect(null,{addPhotoAction,toast})(AddPhoto)