import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from "react-router-dom/Link";
import MyButton from "../../src/utility/myButtons";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import LikeButton from "./likeButton";
import Comment from "./PostActionLayout/Comment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import Linkify from 'react-linkify';
import ReactPlayer from 'react-player';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';





class timelines extends Component {
  state={
    open:false
  }

  handleOpen = () =>{
  this.setState({
    open:true
})
  }
  handleClose = () =>{
    this.setState({
      open:false
    })
  }

    render() {
      
      dayjs.extend(relativeTime)
      const {timeline :{ 
        body, 
        created,
        userImage, 
        timelineId,
        commentCount, 
        imageName,
        videoName,
        fullName,
        postImage,
        postVideo,
        likeCount
      },
      user:{
        authenticated,    
      }
    } = this.props;

    const componentDecorator = (href, text, key) => (
      <a href={href} className="postLinks" key={key} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
   );
    const deleteButton  = authenticated && fullName === this.props.user.credentials.fullName ? (
      <DeleteButton timelineId={timelineId} videoName={videoName} imageName={imageName}  />
  ):null
       const url = `/user/${fullName}`;
      
        return (
            <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" >
                <Link to={url}>
                <img src={userImage} alt="Profile" width="43px" />
                </Link>
                </Avatar>
              }
              action={deleteButton}
              
            
            title={ <Link style={{
              color:"black",
              textDecoration:"none"
            }} to={url}>
              <Typography  className="postBody" variant="body1">{fullName}</Typography>
            </Link> }
            className="CardHeader"
              subheader={dayjs(created).fromNow()}
            />
            <CardContent className="CardContent">
            <Linkify componentDecorator={componentDecorator}>
             <Typography variant="body2" color="black" component="p">
                    {body}
                    </Typography>
             </Linkify>
            </CardContent>
            
           {
             postImage !== "NoImage" ?
             <CardMedia
             className="card-image"
             image={postImage}
             
           />:
           <p style={{display:"none"}}></p>
           }
           {
             postVideo !== "" && postVideo ?
             <CardMedia  className="card-video">
               <div className="player-wrapper">
                    <ReactPlayer className='react-player'
                    style={{background:"black"}}
                        width='100%'
                        height='290px' controls={true} light={postVideo}  url={postVideo} />
                   </div>
             </CardMedia>:
           <p style={{display:"none"}}></p>
           }
            
            <CardActions disableSpacing className="CardActions">
            <LikeButton timelineId={timelineId} />
            <span>{likeCount} likes</span>
            <Comment timelineId={timelineId} fullName={fullName} openDialog={this.props.openDialog}/>
              <span>{commentCount} comments</span>
             {
               postImage ==="NoImage" ?
               <p style={{display:'none'}}></p>
               :
               <>
               <MyButton onClick={this.handleOpen} tip="view image" >
               <ViewAgendaIcon/>
           </MyButton> 
            <span>view Photo</span>
              </>            
             }
          
           
            </CardActions>
           <Dialog open={this.state.open} 
           onClose={this.handleClose}
           >
              <DialogTitle  id="scroll-dialog-title">
               {/* <Button onClick={this.handleClose} variant="contained" color="default">Back</Button> */}
             </DialogTitle>
           <DialogContent>
               <img src={postImage} width="100%" height="100%" alt="View"/>
             </DialogContent>
           </Dialog>
          
          </Card>
        ) 
    }
}

timelines.propTypes  ={
  user: PropTypes.object.isRequired, 
  timeline: PropTypes.object.isRequired,
  openDialog:PropTypes.bool

}
const mapStateToProps = (state) =>({
   user:state.user
})



export default connect(mapStateToProps)(timelines);

