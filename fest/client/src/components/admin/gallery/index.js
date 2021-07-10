import React from 'react';
import {connect} from 'react-redux';

import Sidebar from '../sidebar/Sidebar';
import Photo from './Photo';
import {readGalleryAction} from '../../../action';
import AddPhoto from './AddPhoto';

class AdminGallery extends React.Component{

    addPhoto = (e) => {
        const modalInstruction = document.querySelector(`#add-photo`);
        modalInstruction.classList.add('visible');
    }

    componentDidMount(){
        this.props.readGalleryAction();
    }

    render(){
        return(
            <>
                {/* {console.log(this.props.photos)} */}
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="admin-panel__section">
                        <div>
                        <a href="#add-photo" onClick={(e) => this.addPhoto(e)}>
                            Add Photo
                        </a>
                        </div>
                        <div className="gallery__section">
                            <div className="gallery__container">
                                { 
                                    this.props.photos === null ? '' :
                                    this.props.photos.map((photo,index) => {
                                        return <Photo photo={photo} key={index} />
                                    })
                                }
                                {/* <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div>
                                <div className="photo__container">
                                    <img src="../../../img/head--2.webp" style={{width:'100%',height:'100%'}} alt='dj' />
                                </div> */}
                                {/* <div class="quote">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nesciunt ullam itaque! Consequuntur, asperiores modi!</p>
                                    <span>John Doe</span>
                                </div>
                                <div class="quote span-2">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nesciunt ullam itaque! Consequuntur, asperiores modi!</p>
                                    <span>John Doe</span>
                                </div>
                                <div class="quote">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nesciunt ullam itaque! Consequuntur, asperiores modi!</p>
                                    <span>John Doe</span>
                                </div>
                                <div class="quote">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nesciunt ullam itaque! Consequuntur, asperiores modi!</p>
                                    <span>John Doe</span>
                                </div> */}
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