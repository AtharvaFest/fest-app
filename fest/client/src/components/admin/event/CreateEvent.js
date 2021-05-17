import React from 'react'
import { connect } from 'react-redux'
import {Field,reduxForm,reset} from 'redux-form'
import moment from 'moment'
import DatePicker from "react-datepicker";
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';

import {createEventsAction,readEventsAction} from '../../../action'
import {Alert} from '../../Alert'
import {base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef} from '../../../utils/imageFileUtils'

import 'react-image-crop/dist/ReactCrop.css'

class CreateEvent extends React.Component {

    imageMaxSize = 1000000 // bytes
    acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif, image/webp'
    acceptedFileTypesArray = this.acceptedFileTypes.split(",").map((item) => {return item.trim()})

    state = {
            imageFile: [],
            alertInfo:false,
            alertEventExist:false,
            alertErr:false,
            imgSrc:null,
            imgSrcExt: null,
            croppedImageUrl:null,
            croppedImage:null,
            crop: {
                aspect: 20/12
            }
        }
    imagePreviewCanvasRef = React.createRef()
    

    showAlert = false

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
        // when form is submited then field become empty and if user try to submit empty form
        // the date value is set as invalid date and due to which moment function gives error.
        // that's why we have to check that user don't send empty form.
        if(input.value.toString() === 'Invalid Date'){
            return(
                <div className="create-event__input--group">
                    {this.renderError(meta)}
                    <DatePicker 
                    {...input} 
                    dateFormat="dd/MM/yyyy"   
                    placeholderText={label} 
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

    verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > this.imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!this.acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }


    handleOnDrop = (files,rejectedFiles) => {
        console.log(files);
        console.log(rejectedFiles)
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

    handleImageLoaded = (image) => {
        this.imageRef = image;
    }
    handleOnCropChange = (crop) => {
        this.setState({crop:crop})
    }
    handleOnCropComplete =  (crop) =>{
        const canvasRef = this.imagePreviewCanvasRef.current
        const {imgSrc}  = this.state
        this.getCroppedImg(this.imageRef,crop,canvasRef)
        
    }


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

    handleDownloadClick = (event) => {
        event.preventDefault()
        if (this.imageRef) {
            const canvasRef = this.imagePreviewCanvasRef.current
            console.log(canvasRef);
        
            const {imgSrcExt} =  this.state
            const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)
            this.setState({ croppedImage:imageData64 });
            const myFilename = "previewFile." + imgSrcExt

            // file to be uploaded
            const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
            this.setState({ croppedImage:imageData64 });
            // download file
            // downloadBase64File(imageData64, myFilename)
        }
        

    }

   


    onSubmit = formValue => {
       formValue.image = this.state.croppedImage
    //    console.log(this.state.croppedImage);
        let submitFlag = true;

        // this.props.allEvents.forEach((event)=>{
        //     if(event.event === formValue.event){
        //         submitFlag = false;
        //         this.showAlert = true;
        //         this.setState({alertInfo:false,alertErr:false,alertEventExist:false});
        //         this.setState({alertErr:false,alertInfo:false,alertEventExist:true});                   
        //     }
        // })

        if(submitFlag){
            // sometimes date value we get in string as dd/mm/yyyy. 
            //therefore to get always date value in date type we are doing following conversion
            formValue.date = moment(formValue.date, "DD MM YYYY")._d;
            // formData.append("date", moment(formValue.date, "DD MM YYYY")._d);

            this.props.createEventsAction(formValue).then((value) => {
                this.showAlert = true;
                this.setState({alertInfo:false,alertErr:false,alertEventExist:false});  
                this.setState({alertInfo:true,alertErr:false,alertEventExist:false});        
            }).catch((err) => {
                this.showAlert = true;
                this.setState({alertInfo:false,alertErr:false,alertEventExist:false});
                this.setState({alertErr:true,alertInfo:false,alertEventExist:false});                   
            });
        }
       
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr,alertEventExist)=>{
        if(alertInfo && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Event added" containerId="alert-create-event" alertType={"info"} />
            );
        }
        if(alertEventExist && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="The event has been already added" containerId="alert-create-event" alertType={"error"} />
            );
        }
        if(alertErr && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Something went wrong!" containerId="alert-create-event" alertType={"error"} />
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
                                        this.state.imgSrc ?
                                        // <div >
                                        //     <img src={this.state.imgSrc} style={{height:100}}/>
                                        //20 width, 12 height 
                                        // </div>
                                        <div className="create-event__form--image-container" >
                                            <div className="create-event__form--image-preview">
                                                <ReactCrop
                                                    src={this.state.imgSrc}
                                                    crop={this.state.crop}
                                                    onImageLoaded={this.handleImageLoaded}
                                                    onComplete={this.handleOnCropComplete}
                                                    onChange={this.handleOnCropChange}
                                                />   
                                                <div>
                                                    <canvas ref={this.imagePreviewCanvasRef}></canvas>  
                                                </div> 
                                                <button onClick={this.handleDownloadClick}>Crop</button>                              
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
            {this.alertPopup(this.state.alertInfo,this.state.alertErr,this.state.alertEventExist)}
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