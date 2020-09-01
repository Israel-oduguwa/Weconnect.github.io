import React, { Component } from 'react'
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";

import Dialog from '@material-ui/core/Dialog';

import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentForm from "./CommentForm";
import Avatar from '@material-ui/core/Avatar';

import Toolbar from '@material-ui/core/Toolbar';
import LikeButton from "../likeButton";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '@material-ui/lab/Skeleton';

import Slide from '@material-ui/core/Slide';
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import PropTypes from "prop-types";
import Comments from "./Comments";
import {  getTimeline } from "..//../redux/actions/dataActions";
import MyButton from "../../utility/myButtons";


const styles = (theme)=>( {
  
   
    likeIcon:{
        color:"red",
        fontSize:"1rem",
        marginLeft:"3px"
    },
    likes:{
        padding:"(0 0 0 6px)"
    },
    commentProgress:{
        textAlign:"center",
        marginTop:60,
        marginBottom:50
    },
    dialogLike:{
        marginLeft:"auto"
    },
    commentBar:{
        background:"#ececec",
        borderRadius:"15px",
    
    },
    eachComments:{
        flexBasis:"18%"
    },
    commentPadding:{
        padding: "7px 12px 7px 12px"
    },
    commentData: {
        marginLeft:0,
       width:"fit-content"
       
    },
media:{
    width:"170px",
    height:"40px",
    borderRadius:"12px"
}
})



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
 class Comment extends Component {
   state ={
        open:false,
        oldPath:'',
        newPath:''
   };
   componentDidMount(){
       if(this.props.openDialog){
           this.handleOpen();
       }
   }
   handleOpen = () => {

    let oldPath = window.location.pathname;
    const { fullName, timelineId} = this.props;

    const newPath=`/${fullName}/posts/${timelineId}`

    window.history.pushState(null, null, newPath)
       this.setState({
           
           open:true,
           oldPath, newPath
       });
       this.props.getTimeline (this.props.timelineId);

       if(oldPath ===newPath)oldPath=`user/${fullName}`
   } 
   handleClose = () => {
        window.history.pushState(null,null, this.state.oldPath)
       this.setState({
           open:false,
           
       })
   }
    render() {
        const { classes, timeline:{  timelineId, userImage, fullName, likeCount, comments }, UI: { loading } } = this.props;

        const commentMarkup =   loading ? (
            Array.from({ length: 6}).map((item, index) => (
                <Grid item item xs={12} className={classes.eachComments}>
                <Grid container>
                  <Grid item sm={2}>
                  <Avatar>
                  <Skeleton variant="circle" />  
                  </Avatar>
                  </Grid>
                
                <Grid item sm={9} item xs={9}  >
                <div className={classes.commentData}>
                              <div className={classes.commentBar}>
                              <div className={classes.commentPadding}>
                              <Typography variant="h5" className={classes.userName} >
                              <Skeleton animation="wave" height={20} width="80%" /> 
                                </Typography>
                                <Skeleton animation="wave" variant="rect" className={classes.media} />
                              </div>
                              </div>
                              </div>
                </Grid>
            </Grid>
            </Grid>
            ))
        
        ):(
            <Comments comments={comments} />
        )
      
        return (
          <>
         
            <MyButton onClick={this.handleOpen} tip="Comments" >
                <ChatBubbleOutlineIcon/>
            </MyButton>
            <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition} className="commentDialog" >
            <AppBar  color="appBar"  className="commentTop">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
                <Avatar alt={fullName} component={Link} to={`/user/${fullName}`} src={userImage} className={classes.profileImage}/>
                <FavoriteIcon className={classes.likeIcon} />
                <Typography variant='p' className={classes.likes} >{likeCount}</Typography>
               <div className={classes.dialogLike}>
               <LikeButton timelineId={timelineId}  />
               </div>
            </Toolbar>
          </AppBar>

        <>
        
        {
          commentMarkup
          }
      
      <AppBar position="fixed" className="inputBar">
      <CommentForm timelineId={timelineId} />
      </AppBar>
        </>
      </Dialog>
          </>
        )
    }
}

Comment.propTypes ={
    timelineId : PropTypes.string.isRequired,
    getTimeline: PropTypes.func.isRequired,
    fullName :PropTypes.string.isRequired,
    timeline: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}
 const mapSateToProps = state =>({
     timeline: state.data.timeline,
     UI: state.UI
 })


export default connect(mapSateToProps, { getTimeline } )(withStyles(styles)(Comment));
