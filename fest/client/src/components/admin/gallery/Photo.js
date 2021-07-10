import React from 'react';

class Photo extends React.Component{

    // Binary data is converted to base64 format
    toBase64(arr) {
        return btoa(
          arr.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
      }

    render(){
        return(
            <>
            {console.log(this.props.photo)}
            <div className="photo__container">
                <img src={`data:image/jpeg;base64,${this.toBase64(this.props.photo.photo)}`} style={{width:'100%',height:'100%'}} alt='dj' />
            </div>
            </>
        );
    }
}

 
export default Photo