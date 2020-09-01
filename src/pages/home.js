import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Link from "react-router-dom/Link";
import { Helmet } from "react-helmet";
import Typography from '@material-ui/core/Typography';

import TimelineBar from "../components/timelineBar";
import LinearProgress from '@material-ui/core/LinearProgress';
//Timelines
import Timelines from "../components/timelines";
import Button from "@material-ui/core/Button";
import { getTimelinePost } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LeftButtons from "../components/leftAction/leftButtons";
import RightBar from "../components/RightBar";
import Snackbar from '@material-ui/core/Snackbar';
import PostSkelenton from "../components/PostSkelenton";
export class home extends Component {
  state={
    snack:false
  }
    componentDidMount(){
      this.props.getTimelinePost();
      this.setState({
        snack:true
    })
    }
   //Style this later
   handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
        snack:false
    })
}
    render() {
        
        const { timelines, loading} = this.props.data
        let recentTimelineMarkup = !loading ?(
           timelines.map((timeline) => <Timelines key={timeline.timelineId} timeline={timeline}/>)
        ):( 
            <PostSkelenton/> 
        );

       
        
        return (
           <>
           {
             this.props.user.authenticated ?
             <Grid  container spacing={1}>
             <Helmet>
     <title> WeConnect</title>
   </Helmet>
           <Grid className='extras-grid' item md={3}>
           {
             this.props.user.authenticated ?
             <LeftButtons/>:
             <p></p>
         }
           </Grid>
           <Grid  item xs={12} item md={6} item sm={12} >                   
         <div className="postBar">
         <>
           {
               this.props.user.authenticated ?                
                   <TimelineBar/>:
                   <p></p>
           }
           </>
         </div>
           
          <div className="timelineMarkup">
          {
                recentTimelineMarkup

            }
            {
              this.props.authenticated ?
              <Snackbar
              
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.snack}
              autoHideDuration={4000}
              onClose={this.handleCloseSnack}
              message="Welcome, enjoy the experience"
            />:
           <p style={{display:"none"}}></p>
            }
          </div>
          
           
            
           </Grid >
           <Grid className='feed-grid' item md={3}>
                  {
                      this.props.user.authenticated ? 
                      <RightBar/>:
                      <p></p>
                  }
           </Grid>
         </Grid>:
          <div className="container">
           {
              this.props.user.loading ?
              <LinearProgress />:
              <p></p>
            }
            <div className="row">
            <Helmet>
     <title>Welcome - WeConnect</title>
   </Helmet>
              <div className="col-md-4" style={{paddingRight:"0px"}}>
              <Typography variant="h3" className="welcomeText">Welcome to WeConnect</Typography>
              <Typography variant="h6">Nice to meet you</Typography>
              <br/>
            <Typography variant="body1">
            WeConnect lets you share information to people from anywhere in the world, ask questions and share your View or opinion about something.           
            </Typography>
            <Link to="/signup">
              <Button variant="contained" color="primary">Sign up</Button> </Link>              
              </div>
              <div className="col-md-8"style={{paddingLeft:"0px"}}>
                <div className="image-container">
                  <img src="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/5914-min.jpg?alt=media&token=f525deee-63ee-4445-aefa-3d0e8980f44e" alt="weconnectIll"  className="welcomePageImage"/>
                </div>
              </div>
            </div>
          </div>          
        

           }
           </>
        )
    }
}
home.propTypes  ={
    getTimelinePost: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}
 const mapStateToProps = state =>({
     data: state.data,
     user:state.user
 })
export default connect(mapStateToProps,  { getTimelinePost })(home )
