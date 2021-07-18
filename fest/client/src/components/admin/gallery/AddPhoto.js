import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


import {addPhotoAction} from '../../../action';


class AddPhoto extends React.Component {

    state = {
        selectedFile: null
    };

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] }); 
    };

    onFileUpload = () => {
    
        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "photo",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
      
        // Details of the uploaded file
        console.log(this.state.selectedFile);
        
        this.props.addPhotoAction(formData);

    };

    hideModal = () => {
        const modal = document.querySelector('#add-photo');
        modal.classList.remove('visible')
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
                                    <input type="file" onChange={this.onFileChange} />
                                    <button onClick={this.onFileUpload}>
                                    Upload!
                                    </button>
                                </div>     
                            </div>  
                        </div>
                    </div>
                </div>

            </>
            ,document.querySelector('#crud')
            )
        )
    }
    
}


export default connect(null,{addPhotoAction})(AddPhoto)