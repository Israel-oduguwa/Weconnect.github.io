import React, { Component } from 'react'
import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from '@material-ui/core/CardContent';
import Link from 'react-router-dom/Link';
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PropTypes from "prop-types";
import { postTimeline, getTimelinePost, postImage } from "../redux/actions/dataActions";
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import axios from "axios";
import ReactPlayer from 'react-player';

import Collapse from '@material-ui/core/Collapse';
import CancelIcon from '@material-ui/icons/Cancel';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


const styles = (theme)=>( {
    large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
   
  }

});
class timelineBar extends Component {
     state = {
         body:'',
         errors:{},
         postImage:"",
         imageName:"",
         postVideo:"",   
         videoName:"",     
         loading:false,
         open:false,
        
     }

handleEmoji =(e) =>{
    let emoji = e.native;
    this.setState({
      body: this.state.body + emoji
     
    });
   
console.log(e);
}
     handleOpen = () =>{
        if (this.state.open===false){
            this.setState({
                open:true
            })
           }else{
            this.setState({
                open:false
            })
           }
     }
     componentWillReceiveProps(nextProps) {
         if(nextProps.UI.errors){
             this.setState({
                 error: nextProps.UI.errors
             })
         };
         if(!nextProps.UI.errors && !nextProps.UI.loading){
             this.setState({ body: ''});

         }
     }
     handlePostImageChange = (e) =>{
        this.setState({
            loading:true
        })   
         const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
       
       
        axios.post('/postTimeline/image' , formData)
        .then((res) =>{
            this.setState({
                postImage:res.data.postImage,
                imageName:res.data.imageName,
                loading:false
            })
           
        })
        .catch((err) =>{
            console.log(err)
        })
     }
     handlePostVideoChange = (e) => { 
        this.setState({
            loading:true
        })   
         const video = e.target.files[0];
        const formData = new FormData();
        formData.append('video', video, video.name); 
        
        axios.post('/postTimeline/video' , formData)
        .then((res) =>{
            this.setState({
                postVideo:res.data.postVideo,
                videoName:res.data.videoName,
                loading:false
            })
            
        })
        .catch((err) =>{
            console.log(err)
        })
     }
     PostTimelineImage = (e) =>{
        const file = document.getElementById("postImage");
         file.click()
       
     }
     PostTimelineVideo = (e) =>{
        const file = document.getElementById("postVideo");
         file.click()
       
     }
     handleChange = (e) =>{
         this.setState({ [e.target.name]: e.target.value})
         
     }
     handleSubmit = (e) => {
         e.preventDefault();
         this.props.postTimeline({ 
             body: this.state.body, 
             postImage: this.state.postImage,
             postVideo:this.state.postVideo,
             videoName:this.state.videoName,
            imageName:this.state.imageName
         })  
         this.setState({
             postImage:"",
             postVideo:"",
             body:""
         })     
     }
     cancelVideo = () =>{
        axios.delete(`imageDelete/${this.state.videoName}/delete`)
      .then((res) =>{
        this.setState({
            postVideo:""
         })
      })          
        .catch((err) =>{
            console.log(err)
        })
     }
     cancelImage = () =>{
        axios.delete(`imageDelete/${this.state.imageName}/delete`)
        .then((res) =>{
            this.setState({
               postImage:""
            })
        })
        .catch((err) =>{
            console.log(err)
        })
     }
   
    render() {
       
        const { classes ,UI: { loading } } =this.props
        const {
          user:{
            authenticated,
            credentials:{
                fullName,
                imageUrl
            }
          }
        } = this.props;
       
        return (
            <Card>
                <CardContent>
                
                   <form onSubmit={this.handleSubmit}>
                    <div className="avatar-">
                    <Avatar src={imageUrl} alt={fullName} className={classes.large} />
           
                    <TextField
                    id="body"
                    label="scream to the world"
                    placeholder="What's happening"
                    multiline
                    variant="outlined"
                    value={this.state.body}
                    name="body"
                    onChange={this.handleChange}
                    
                    fullWidth
                    />

                    <br/>
                    </div>
                   <>
                   {
                       authenticated ? 
                       <Button  type="submit" variant="contained" color="primary" disabled={loading}>
                       Post
                       {
                           loading && (
                               <CircularProgress size={30} />
                           )
                       }
                   </Button> :
                     <Link to="/login">
                         <Button   variant="contained" color="primary" disabled={loading}>
                     Post
                     {
                         loading && (
                             <CircularProgress size={30} />
                         )
                     }
                 </Button>
                     </Link>
                   }
                   </>
                  <>
                  {
                      authenticated ?
                      <>
                      <input type="file" id="postImage" accept="images/*"
                      className={classes.postImage}
                      multiple
                      onChange={this.handlePostImageChange}
                      hidden="hidden"
                      />
                      <Tooltip title="postImage">
                          <IconButton 
                          onClick={this.PostTimelineImage}
                          className={classes.coverButton}>
                              <InsertPhotoIcon fontSize="large"  />
                          </IconButton>
                      </Tooltip>
                      </>:

                      <p></p>
   
                  }
                  </>
                  <>
                  {
                      authenticated ?
                      <>
                      <input type="file" id="postVideo" accept="video/*"
                      className={classes.postVideo}
                      multiple
                      onChange={this.handlePostVideoChange}
                      hidden="hidden"
                      />
                      <Tooltip title="postVideo">
                          <IconButton 
                          onClick={this.PostTimelineVideo}
                          className={classes.coverButton}>
                              <VideoLibraryIcon fontSize="large"  />
                              
                          </IconButton>
                      </Tooltip>
                      </>:

                      <p></p>
   
                  }
                  </>
                  {
                      authenticated ?
                      <>
                        <IconButton  onClick={this.handleOpen}>
                            <InsertEmoticonIcon  fontSize="large"/>
                        </IconButton>
                      </>:
                      <p>

                      </p>
                  }
                    </form>  
               {
                   this.state.postImage === "" && !this.state.loading ?
                   <p></p>:
                  this.state.loading  ?
                  <CircularProgress/>:
                   <>
                   <Tooltip title="cancelImage">
                   <IconButton 
                   onClick={this.cancelImage}
                   className={classes.coverButton}>
                       <CancelIcon style={{fontSize:"4vh"}} />
                   </IconButton>
               </Tooltip>
                   <CardMedia
                   image={this.state.postImage}
                   className="card-image2"/>
                   </>
               }

        {
                    this.state.postVideo === ""&& !this.state.loading ?
                    <p></p>
                    :
                  this.state.loading ?
                  <CircularProgress/>:
                    <>
                    <Tooltip title="Cancel Video">
                    <IconButton 
                    onClick={this.cancelVideo}
                    className={classes.coverButton}>
                        <CancelIcon style={{fontSize:"4vh"}} />
                    </IconButton>
                </Tooltip>
                    <CardMedia>
                    <div className="player-wrapper">
                    <ReactPlayer className='react-player'
                        width='100%'
                        height='100%' controls={true} loop={true} url={this.state.postVideo} />
                   </div>
                   
                    </CardMedia>
                    </>                  
                }
                </CardContent>
             <Collapse in={this.state.open} timeout="auto" unmountOnExit>
             <Picker set='apple' emojiSize={30} style={{width:"100%"}} title='Pick your emoji…' emoji='point_up'  onClick={this.handleEmoji} />
             </Collapse>
             
              </Card>
        )
    }
}


const mapStateToProps = (state) => ({
    user:state.user,
    UI:state.UI,
    postUrl:state.data
})

timelineBar.propTypes ={
    postTimeline: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    getTimelinePost: PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired,
    postImage:PropTypes.func.isRequired
}
export default connect(mapStateToProps,
     {postTimeline, getTimelinePost, postImage}
     )(withStyles(styles)(timelineBar))

