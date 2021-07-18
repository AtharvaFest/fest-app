import React from 'react'
import { connect } from 'react-redux'
import {Field,reduxForm,reset} from 'redux-form'
import moment from 'moment'
import DatePicker from "react-datepicker";
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';

import {getEventUpdateAction,eventUpdateAction,readEventsAction} from '../../../../action'
import {extractImageFileExtensionFromBase64} from '../../../../utils/imageFileUtils'
import Toast,{toast} from '../../../toast'

import 'react-image-crop/dist/ReactCrop.css'

class EditEvent extends React.Component {

    acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif, image/webp'
    acceptedFileTypesArray = this.acceptedFileTypes.split(",").map((item) => {return item.trim()})
    imagePreviewCanvasRef = React.createRef()
    urlPathArray = window.location.pathname.split('/');

    state = {
            imageFile: [],
            alertInfo:false,
            alertUploadImg:false,
            alertEventExist:false,
            alertErr:false,
            imgSrc:null,
            imgSrcExt: null,
            firstRenderImage:true,
            displayImageBlock: null,
            croppedImageUrl:null,
            croppedImage:null,
            resetImage:false,
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

    renderSelectInput = ({input,label,meta}) => {
        return(
            <div className="create-event__input--group">
                {this.renderError(meta)}
                {/* <input {...input} type={type} placeholder={label} className="create-event__input" autoComplete="off" required/> */}
                <select {...input}  className="create-event__input create-event__select-input">
                    <option value="true">Allow Registration</option>
                    <option value="false">Don't Allow Registration</option>
                </select>
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
    }

    //Here image is cropped and shown in image preview 
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

    //Here  main image is removed and only croped image is shown on crop click
    handleCropClick = (event) => {
        event.preventDefault()
        const canvasRef = this.imagePreviewCanvasRef.current
        if (canvasRef.height > 0) {
            const {imgSrcExt} =  this.state
            const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)
            this.setState({ 
                croppedImage:imageData64,
                imgSrc:null,
                firstRenderImage:false,
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
            firstRenderImage:false,
            showCropImageOption:true,
            imgSrc: null,
            imgSrcExt: null,
            croppedImage:null,
            resetImage:true,
            crop: {
                unit: 'px', // default, can be 'px' or '%'
                width: 200,
                height: 120
            }

        })
    }

    // Binary data is converted to base64 format
    toBase64(arr) {
        return btoa(
          arr.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
      }
   


    onSubmit = async (formValue) => {
        // console.log(formValue);
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

        if(formValue.prize < formValue.fee){
            if(!window.confirm("Prize Worth is less than Entry Fee.\nAre sure?")){
                submitFlag=false
            }
        }

        
        if(submitFlag){
            // sometimes date value we get in string as dd/mm/yyyy. 
            //therefore to get always date value in date type we are doing following conversion
            formValue.date = moment(formValue.date, "DD MM YYYY")._d;
            
            await this.props.eventUpdateAction(this.urlPathArray[4],formValue).then(() => {
                this.props.toast({
                    containerId: "toast-create-event",
                    toastType: "info",
                    message: "Event updated",
                    showToast:true
                })     
            }).catch((err) => {
                if(err.response?.data?.errors){
                    err.response.data.errors.forEach((event,index) => {
                        this.props.toast({
                            containerId: `toast-create-event-${index}`,
                            toastType: "warning",
                            message:event.msg,
                            showToast:true
                        }) 
                    })
                    
                    return
                }

                this.props.toast({
                    containerId: "toast-create-event",
                    toastType: "error",
                    message: "Something went wrong!",
                    showToast:true
                })                    
            });

            await this.props.getEventUpdateAction(this.urlPathArray[4]);
        }
       
    }

    componentDidMount(){
        this.props.readEventsAction();
        this.props.getEventUpdateAction(this.urlPathArray[4]);
        this.setState({displayImageBlock:true})
    }

    isEventToEmpty() {
        return this.props.getEventUpdate.getEventUpdate.length === 0
    }

    componentDidUpdate(){
        if(this.state.firstRenderImage){
            const canvasRef = this.imagePreviewCanvasRef.current;
            if(canvasRef){
                const ctx = canvasRef.getContext('2d');

                if(!this.isEventToEmpty()){
                    var image = new Image();
                    image.onload = function() {
                        ctx.drawImage(image, 0, 0);
                    };
                    image.src = `data:image/jpeg;base64,${this.toBase64(this.props.getEventUpdate.getEventUpdate.image)}`;
                }
            }
        }        
    }

    static getDerivedStateFromProps(props,state){
        const toBase64 = (arr) => {
            return btoa(
              arr.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
            );
        }
        // the state (croppedImage) will get intial value here as other field get below at mapStatetoProps
        if(state.croppedImage === null && state.resetImage === false){
            if(props.getEventUpdate.getEventUpdate.length !== 0){
                return {
                    croppedImage:`data:image/jpeg;base64,${toBase64(props.getEventUpdate.getEventUpdate.image)}`
                }
            }
        }
        
        return null
    }

    render(){
        return(
            <>
            <div className="create-event__section">
                <div className="create-event__header">
                    <a href="/admin/event/manage" className="create-event__header--btn">
                        <ion-icon name="chevron-back-outline" class="chevron"></ion-icon>
                    </a>
                    <h4 className="heading--4 create-event__heading">Edit Event</h4>
                </div>
                <div className="create-event__container" >
                    <div>
                        <form className="create-event__form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className="create-event__edit-form--content">
                                <Field 
                                name="event" 
                                type="text" 
                                component={this.renderInput} 
                                label="Event" 
                                />

                                <Field 
                                name="date" 
                                component={this.renderDate} 
                                label="Date" 
                                />

                                <Field 
                                name="fee" 
                                type="text" 
                                component={this.renderInput} 
                                label="Entry Fee" 
                                />

                                <Field 
                                name="prize" 
                                type="text" 
                                component={this.renderInput} 
                                label="Prize Worth" 
                                />

                                <Field 
                                name="discount" 
                                type="text" 
                                component={this.renderInput} 
                                label="Discount (e.g 10,20,5)" 
                                />

                                <Field 
                                name="allowRegistration"
                                component={this.renderSelectInput} 
                                label="Registration status" 
                                />      

                                {/* <Field name="allowRegistration" className="create-event__input--group create-event__select-input" component="select">
                                    <option value="true">Allow Registration</option>
                                    <option value="false">Don't Allow Registration</option>
                                </Field> */}

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
                                                <canvas ref={this.imagePreviewCanvasRef} /> 
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
                    </div>
                    <br />
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
  dispatch(reset('editEventForm'));

const mapStatetoProps = (state) => {
    return {
        events:state.adminCRUDEventReducer,
        getEventUpdate:state.getEventUpdateReducer,
        initialValues:{
            event:state.getEventUpdateReducer.getEventUpdate.event,
            date:moment(new Date(state.getEventUpdateReducer.getEventUpdate.date)).isValid() ? 
                 moment(new Date(state.getEventUpdateReducer.getEventUpdate.date), "DD MM YYYY") : '',
            fee:state.getEventUpdateReducer.getEventUpdate.fee,
            prize:state.getEventUpdateReducer.getEventUpdate.prize,
            discount:state.getEventUpdateReducer.getEventUpdate.discount,
            allowRegistration:state.getEventUpdateReducer.getEventUpdate.allowRegistration
        }
    }
}
 

export default connect(mapStatetoProps,{getEventUpdateAction,eventUpdateAction,readEventsAction,toast})(reduxForm({
    form:'editEventForm',
    onSubmitSuccess:afterSubmit,
    validate,
    enableReinitialize: true
})(EditEvent));