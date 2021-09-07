import React from 'react';
import {connect} from 'react-redux';

import Sidebar from '../sidebar/Sidebar';
import Photo from './Photo';
import {readGalleryAction} from '../../../action';
import AddPhoto from './AddPhoto';
import Logout from '../auth/Logout';

class AdminGallery extends React.Component{



    addPhoto = (e) => {
        const modalInstruction = document.querySelector(`#add-photo`);
        modalInstruction.classList.add('visible');
    }

    getAllGalleryData = () =>{

        

        if(this.props.photos === null) {
            return (<div className="no-content">Loading...</div>);
        }


        if(this.props.photos.length === 0) {
            return (<div className="no-content">No Photos</div>);
        }

        return(
            this.props.photos.map((photo,index) => {
                return <Photo photo={photo} key={index} />
            })
        );
    }

    componentDidMount(){
        this.props.readGalleryAction();
    }

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="admin-panel__section">
                        <div className="admin-panel__content">
                            <div className="admin-panel__navbar">
                                <div className="admin-panel__navbar-left">
                                    <a href="#add-photo" className="add__photo" onClick={(e) => this.addPhoto(e)}>
                                        Add Photo
                                    </a>                                    
                                </div> 
                                <div className="admin-panel__navbar-right">                                   
                                    <Logout />
                                </div>  
                            </div>

                            <div className="gallery__section">
                                <div className="gallery__container">
                                    { 
                                        
                                        this.getAllGalleryData()
                                    }
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <AddPhoto />
            </>
        );
    }
}

const mapStatetoProps = (state) => {
    return state.adminCRUDGalleryReducer
}
 
export default connect(mapStatetoProps,{readGalleryAction})(AdminGallery)