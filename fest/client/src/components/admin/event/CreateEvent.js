import React from 'react'
import { connect } from 'react-redux'
import {Field,reduxForm,reset} from 'redux-form'
import moment from 'moment'
import DatePicker from "react-datepicker";
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';

import {createEventsAction,readEventsAction} from '../../../action'
import {extractImageFileExtensionFromBase64} from '../../../utils/imageFileUtils'
import Toast,{toast} from '../../toast'

import 'react-image-crop/dist/ReactCrop.css'

class CreateEvent extends React.Component {

    
    acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif, image/webp'
    acceptedFileTypesArray = this.acceptedFileTypes.split(",").map((item) => {return item.trim()})
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
            showCropImageOption:false,
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
        this.setState({showCropImageOption:true})
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
            this.setState({ 
                croppedImage:imageData64,
                imgSrc:null,
                showCropImageOption:false 
             });
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
            showCropImageOption:true,
            croppedImage:null,
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
            submitFlag = false;
            this.props.toast({
                containerId: "toast-create-event",
                toastType: "warning",
                message: "Upload/Crop image",
                showToast:true
            })
            return
        }

        this.handleClearToDefault()
        
        this.props.allEvents.forEach((event)=>{
            if(event.event.toLowerCase() === formValue.event.toLowerCase()){
                submitFlag = false;
                this.props.toast({
                    containerId: "toast-create-event",
                    toastType: "error",
                    message: "The event has been already added",
                    showToast:true
                })                
            }
        })

        
        if(Number.parseInt(formValue.prize) < Number.parseInt(formValue.fee)){
            if(!window.confirm("Prize Worth is less than Entry Fee.\nAre sure?")){
                submitFlag=false
            }
        }
        
        if(submitFlag){
            // sometimes date value we get in string as dd/mm/yyyy. 
            //therefore to get always date value in date type we are doing following conversion
            formValue.date = moment(formValue.date, "DD MM YYYY")._d;
 
            this.props.createEventsAction(formValue).then(() => {
                this.props.toast({
                    containerId: "toast-create-event",
                    toastType: "info",
                    message: "Event added",
                    showToast:true
                })     
            }).catch((err) => {
                this.props.toast({
                    containerId: "toast-create-event",
                    toastType: "error",
                    message: "Something went wrong!",
                    showToast:true
                })                    
            });
        }
       
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
                    <div >
                        <form className="create-event__form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className="create-event__form--content">
                        
                            <Field name="event" type="text" component={this.renderInput} label="Event" />

                            
                            <Field name="date" component={this.renderDate} label="Date" />

                            
                            <Field 
                            name="fee" 
                            type="text" 
                            component={this.renderInput} 
                            label="Entry Fee (e.g 100,200,50)Rs" />

                            <Field 
                            name="prize" 
                            type="text" 
                            component={this.renderInput} 
                            label="Prize Worth (e.g 1000,2000,5000)Rs" 
                            />

                            
                            <Field 
                            name="discount" 
                            type="text" 
                            component={this.renderInput} 
                            label="Discount (e.g 10,20,5)%"  
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
                                            {
                                            
                                                this.state.showCropImageOption ?                                                
                                                <button onClick={this.handleCropClick} className="btn__crop">Crop</button> 
                                                :
                                                ''   
                                            }    
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
                        <br />
                    </div>
                </div>
            </div>
            <Toast />
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
 

export default connect(mapStatetoProps,{createEventsAction,readEventsAction,toast})(reduxForm({
    form:'createEventForm',
    onSubmitSuccess:afterSubmit,
    validate
})(CreateEvent));