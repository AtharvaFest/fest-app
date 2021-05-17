import React from 'react'
import { connect } from 'react-redux'
import {Field,reduxForm,reset} from 'redux-form'
import moment from 'moment'
import DatePicker from "react-datepicker";
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';

import {createEventsAction,readEventsAction} from '../../../action'
import {Alert} from '../../Alert'
import {extractImageFileExtensionFromBase64} from '../../../utils/imageFileUtils'

import 'react-image-crop/dist/ReactCrop.css'

class CreateEvent extends React.Component {

    imageMaxSize = 2000000 // bytes
    acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif, image/webp'
    acceptedFileTypesArray = this.acceptedFileTypes.split(",").map((item) => {return item.trim()})
    showAlert = false
    imagePreviewCanvasRef = React.createRef()

    state = {
            imageFile: [],
            alertInfo:false,
            alertUploadImg:false,
            alertEventExist:false,
            alertErr:false,
            imgSrc:null,
            imgSrcExt: null,
            displayImageBlock: null,
            croppedImageUrl:null,
            croppedImage:null,
            crop: {
                unit: 'px', // default, can be 'px' or '%'
                width: 200,
                height: 120,
                
            }
        }
    
    
    // Show Error onChange in input fields
    renderError({ error}) {
        if (error) {
          return (
            <div>
              <div className="error_msg paragraph">{error}</div>
            </div>
          );
        }
      }

    //creating input field for Redux form Field component
    renderInput = ({input,label,type,meta}) => {
        return(
            <div className="create-event__input--group">
                {this.renderError(meta)}
                <input {...input} type={type} placeholder={label} className="create-event__input" autoComplete="off" required/>
                <label htmlFor={label} className="create-event__label">{label}</label>
            </div>
        );
    }

    renderDate = ({input,label,meta}) => {
        return(
        <div className="create-event__input--group">
            {this.renderError(meta)}
            <DatePicker             
            {...input} 
            dateFormat="dd/MM/yyyy"   
            placeholderText={label} 
            selected={input.value ? moment(input.value, "DD MM YYYY")._d: null} 
            autoComplete="off"
            className="create-event__date-input"
            calendarClassName="calender"
            minDate={new Date()}
            required
            />
            <label htmlFor={label} className="create-event__date-label">{label}</label>
        </div>
        );
    }

    // It renders an input field to select image
    renderDropzone = ({input,handleOnDrop}) => {
        return(
            <Dropzone
                accept={this.acceptedFileTypes}
                onDrop={handleOnDrop}
                maxSize={this.imageMaxSize}
                multiple={false}
            >
                 {
                 ({getRootProps, getInputProps}) => {
                     return(
                        <div className="create-event__form--image-upload"
                        {...getRootProps()}
                        >
                            <input 
                            {...getInputProps()}
                            />
                            <p>Drag 'n' drop image here</p>
                            <p>OR</p>
                            <p>Click to select image</p>
                        </div>
                        )
                     }
                }
            </Dropzone>
        )
        
    }

    //This will verify whether the give image size must be smaller then maxSize
    //As well as gives alert
    verifyFile = (files) => {
        if (files[0].errors && files.length > 0){
            const currentFile = files[0].file
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
          
            if(currentFileSize > this.imageMaxSize) {
                alert("More than 2MB file is not allowed")
                return false
            }
            if (!this.acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
        else{
            return true
        }
    }

    // This function is used to get valid as well as rejected image 
    // after selecting image by user.
    handleOnDrop = (files,rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0){
            this.verifyFile(rejectedFiles)
            this.setState({ imageFile: rejectedFiles })
        }

        if (files && files.length > 0){
            const isVerified = this.verifyFile(files)
            if (isVerified){
                // imageBase64Data 
                const currentFile = files[0]
                //FilerReader is used to read the data of file
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener("load", ()=>{
                    const myResult = myFileItemReader.result
                    this.setState({
                        displayImageBlock:myResult,
                        imgSrc: myResult,
                        imgSrcExt: extractImageFileExtensionFromBase64(myResult)
                    })
                }, false)

                // here we are reading image date from variable 'currentFile'
                // after data is completed loaded or read then the event listener 
                // which we have set above is called on data 'load'
                myFileItemReader.readAsDataURL(currentFile)

            }
       }
        
    }

    // Following functions are used to crop image and show preview.
    //{handleImageLoaded,handleOnCropChange,handleOnCropComplete,getCroppedImg}
    handleImageLoaded = (image) => {
        this.imageRef = image;
    }
    handleOnCropChange = (crop) => {
        this.setState({crop:crop})
    }
    handleOnCropComplete =  (crop) =>{
        const canvasRef = this.imagePreviewCanvasRef.current
        this.getCroppedImg(this.imageRef,crop,canvasRef)
        this.setState({discount:canvasRef.height})
    }

    //Here image is cropped and show in image preview 
    //(canvas html element is used to show preview)
    getCroppedImg(image, crop,canvasRef) {
        const canvas = canvasRef;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
      }

    //Here image Main image is removed and only croped image is shown on crop click
    handleCropClick = (event) => {
        event.preventDefault()
        const canvasRef = this.imagePreviewCanvasRef.current
        if (canvasRef.height > 0) {
            const {imgSrcExt} =  this.state
            const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)
            this.setState({ croppedImage:imageData64,imgSrc:null });
        }
   
    }

    // Here all croped as well as main imaged is cleared and only dropzone is shown
    handleClearToDefault = event =>{
        if (event) event.preventDefault()
        const canvas = this.imagePreviewCanvasRef.current
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.setState({
            displayImageBlock:null,
            imgSrc: null,
            imgSrcExt: null,
            crop: {
                unit: 'px', // default, can be 'px' or '%'
                width: 200,
                height: 120
            }

        })
    }
   


    onSubmit = formValue => {
        formValue.image = this.state.croppedImage;
        let submitFlag = true;
        if(!formValue.image) {
            this.showAlert = true;
            submitFlag = false;
            this.setState({
                        alertInfo:false,
                        alertErr:false,
                        alertEventExist:false,
                        alertUploadImg:false
                    });
            this.setState({
                alertErr:false,
                alertInfo:false,
                alertEventExist:false,
                alertUploadImg:true
            }); 
            return
        }

        this.handleClearToDefault()
        
        this.props.allEvents.forEach((event)=>{
            if(event.event.toLowerCase() === formValue.event.toLowerCase()){
                submitFlag = false;
                this.showAlert = true;
                this.setState({
                    alertInfo:false,
                    alertErr:false,
                    alertEventExist:false,
                    alertUploadImg:false
                });
                this.setState({
                    alertErr:false,
                    alertInfo:false,
                    alertEventExist:true,
                    alertUploadImg:false
                });                   
            }
        })
        
        if(submitFlag){
            // sometimes date value we get in string as dd/mm/yyyy. 
            //therefore to get always date value in date type we are doing following conversion
            formValue.date = moment(formValue.date, "DD MM YYYY")._d;
 
            this.props.createEventsAction(formValue).then((value) => {
                this.showAlert = true;
                this.setState({
                        alertInfo:false,
                        alertErr:false,
                        alertEventExist:false,
                        alertUploadImg:false
                    });  
                this.setState({
                    alertInfo:true,
                    alertErr:false,
                    alertEventExist:false,
                    alertUploadImg:false
                });        
            }).catch((err) => {
                this.showAlert = true;
                this.setState({
                        alertInfo:false,
                        alertErr:false,
                        alertEventExist:false,
                        alertUploadImg:false
                    });
                this.setState({
                    alertErr:true,
                    alertInfo:false,
                    alertEventExist:false,
                    alertUploadImg:false
                });                   
            });
        }
       
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr,alertUploadImg,alertEventExist)=>{
        if(alertInfo && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Event added" containerId="alert-create-event" alertType={"info"} />
            );
        }
        if(alertErr && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Something went wrong!" containerId="alert-create-event" alertType={"error"} />
            );
        }
        if(alertUploadImg && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Upload image" containerId="alert-create-event" alertType={"warning"} />
            );
        }
        if(alertEventExist && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="The event has been already added" containerId="alert-create-event" alertType={"warning"} />
            );
        }
        
        

        return<></>;
        
    }

    componentDidMount(){
        this.props.readEventsAction();
    }

    render(){
        return(
            <>
            <div className="create-event__section">
                <div className="create-event__header">
                    <a href="/admin/event/manage" className="create-event__header--btn">
                        <ion-icon name="chevron-back-outline" class="chevron"></ion-icon>
                    </a>
                    <h4 className="heading--4 create-event__heading">Add Event</h4>
                </div>
                <div className="create-event__container" >
                    <div className="" >
                        <div className="" >
                            <div className="">
                                 <form className="create-event__form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                     <div className="create-event__form--content">
                                 {/* <div className="">Error that is shown here</div> */}
                                    <Field name="event" type="text" component={this.renderInput} label="Event" />

                                    {/* <div className="">Error that is shown here</div> */}
                                    <Field name="date" component={this.renderDate} label="Date" />

                                    {/* <div className="">Error that is shown here</div> */}
                                    <Field name="fee" type="text" component={this.renderInput} label="Entry Fee" />

                                    <Field name="prize" type="text" component={this.renderInput} label="Prize Worth" />

                                    {/* <div className="">Error that is shown here</div> */}
                                    <Field 
                                    name="discount" 
                                    type="text" 
                                    component={this.renderInput} 
                                    label="Discount" 
                                    />
                                    {
                                        this.state.displayImageBlock ?
                                        <div className="create-event__form--image-container" >
                                            <div className="create-event__form--image-preview">
                                                <ReactCrop
                                                    src={this.state.imgSrc}
                                                    crop={this.state.crop}
                                                    onImageLoaded={this.handleImageLoaded}
                                                    onComplete={this.handleOnCropComplete}
                                                    onChange={this.handleOnCropChange}
                                                    minWidth={200}
                                                    minHeight={120}
                                                    maxWidth={200}
                                                    maxHeight={120} 
                                                />   
                                                <div>
                                                    <canvas ref={this.imagePreviewCanvasRef}></canvas>  
                                                </div> 
                                                <div className="image_btn--container">
                                                    <button onClick={this.handleCropClick} className="btn__crop">Crop</button>    
                                                    <button onClick={this.handleClearToDefault} className="btn__reset-image">Reset Image</button>                           
                                                </div>
                                            </div>
                                        </div>
                                        :
                                    <Field name="image" type="file" component={this.renderDropzone} handleOnDrop={this.handleOnDrop} />
                                    }
                                    </div>
                                    <button className="create-event__btn" >Add Event</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {this.alertPopup(this.state.alertInfo,this.state.alertErr,this.state.alertUploadImg,this.state.alertEventExist)}
            </>
        );
    }

}

const validate = (formValue) => {
    const errors = {};  

    if (isNaN(formValue.fee) && formValue.fee !== undefined) {
      errors.fee = 'Fee must be number';
    }

    if (isNaN(formValue.prize) && formValue.prize !== undefined) {
        errors.prize = 'Prize must be number';
      }

    if (isNaN(formValue.discount) && formValue.discount !== undefined) {
        errors.discount = 'Discount must be number';
      }
  
  
    return errors;
  };

// clear all input field after submiting form.
const  afterSubmit = (_, dispatch) =>
  dispatch(reset('createEventForm'));

const mapStatetoProps = (state) => {
    return state.adminCRUDEventReducer
}
 

export default connect(mapStatetoProps,{createEventsAction,readEventsAction})(reduxForm({
    form:'createEventForm',
    onSubmitSuccess:afterSubmit,
    validate
})(CreateEvent));