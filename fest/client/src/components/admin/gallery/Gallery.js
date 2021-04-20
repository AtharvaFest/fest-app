import React from 'react'

import Sidebar from '../sidebar/Sidebar'

class Gallery extends React.Component{

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="">
                        Gallery
                    </div>
                </div>
            </>
        );
    }
}

 
export default Gallery