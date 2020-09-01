import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";


export class PhotoGallery extends Component {
    
    render() {
        const timelinePhoto = this.props.history.location.state.posts;
       let images = timelinePhoto ? (
           timelinePhoto.map((photo) =>{
              
               console.log(photo.postImage);
               console.log(photo.fullName)
               return(
                  <>
                    {
                        photo.postImage !=="NoImage" ?
                        <div  className="col-md-3" id="box">
                        <img src={photo.postImage} className="img-fluid" alt="postedImage"/>
                    </div>:
                    <p style={{display:"none"}}></p>
                    }
                  </>
               )
           })
       ):(
           <p></p>
       )
        const url =`/user/${this.props.history.location.state.name}`
        return (
            <>
            <Button component={Link} to={url} variant="contained">Back</Button>
            <div className="container">
            
                <div className="row" id="rows">
               
 
                        
                            {
                                images
                            }
                        
                  
                </div>
            </div>
            </>
        )
    }
}

export default PhotoGallery
