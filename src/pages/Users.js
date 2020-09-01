import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from "axios";
import Timelines from '../components/timelines';
import StaticProfile from "../components/StaticProfile";
import ProfileAbout from "../components/ProfileAbout";
import LeftButtons from "../components/leftAction/leftButtons";
import Grid from "@material-ui/core/Grid";
import { connect }  from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { getUserData} from '../redux/actions/dataActions';
import UserSkelton from "../components/UserSkelton";
import { Helmet } from "react-helmet";
const styles = (theme) =>({
    profileDisplay:{
        justifyContent:"center",
    }
})

 class Users extends Component {
    state ={
        profile: null,
        timelines:null,
        timelineIdParam:null
    }
     componentDidMount(){
        const fullName =  this.props.match.params.fullName;
       const timelineId = this.props.match.params.timelineId;
        
       if(timelineId) this.setState({ timelineIdParam: timelineId });
        axios.get(`/user/${fullName}`)
            .then((res) =>{
               this.setState({
                profile:res.data.user
               });
               this.setState({
                   timelines:res.data.timelinePost
               })
            })
            .catch(err => console.log(err));
     }
    render() {
        const fullName =  this.props.match.params.fullName
      
       const {timelineIdParam } = this.state
        const timelineMarkup = this.state.timelines === null ? (
           <p>No posts from this User </p>
        ): !timelineIdParam ? (
            this.state.timelines.map((timeline) => <Timelines key={timeline.timelineId} timeline={timeline} />)
        ):(
            this.state.timelines.map((timeline) =>{
                if(timeline.timelineId !== timelineIdParam)
                return <Timelines key={timeline.timelineId} timeline={timeline} />
                else return <Timelines key={timeline.timelineId} timeline={timeline} openDialog />
            })
        )
        const title =  `${fullName} - Weconnect`;
        const description  = `${fullName} is on WeConnect. Join WeConnect to connect with ${fullName} and others you may know`;
        return (
           <Grid container spacing={1}>
              <>
              <Helmet>
      <title> {fullName} - WeConnect</title>      
     <meta  name="description" content={description} />    
     <meta property="og:title" content={title}/>
    <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/5914-min-min-min__1598986408_197.210.47.154.jpg?alt=media&token=d8360dc3-1267-4720-9572-99fb9cd4c31d"/>
    <meta property ="og:description" content ={description}/>
    <meta property="og:type" content="website"/>
    <meta property="twitter:title" content={title}/>
    <meta property = "twitter:description" content={description}/>
    <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/5914-min-min-min__1598986408_197.210.47.154.jpg?alt=media&token=d8360dc3-1267-4720-9572-99fb9cd4c31d"/>
    <meta property="twitter:card" content="summary_large_image"/>
   
    </Helmet>
             <Grid className='extras-grid' item md={3}>
                 {
                     this.props.user.authenticated ?
                     <LeftButtons/>:
                     <p></p>
                 }
             </Grid>
             </>
             <Grid item xs={12} item md={9} item sm={9}>
                 <>
                 {
                   this.state.profile === null  ? (
                    <UserSkelton/>
                   ):(
                    <StaticProfile profile={this.state.profile} />
                   )
               }
                 </>
                 <Grid item xs={12} className="profile-desktop">
              <Grid container spacing={2}>
              <Grid  item xs={12} item md={5} item sm={12}>
                 {
                     this.state.profile === null  && this.state.timelines === null ? (
                         <p></p>
                     ):(
                        <ProfileAbout profile={this.state.profile} timelines={this.state.timelines} />
                       )
                 }
               </Grid>
               <Grid item sm={6} item md={6} xs={12}>
                   
                   {timelineMarkup}
               </Grid>
              </Grid>
              </Grid>
             </Grid>
            
           </Grid>

        )
    }
}

Users.propTypes ={
    getUserData:propTypes.func.isRequired,
    data:propTypes.object.isRequired
}

const mapStateToProps = state =>({
    data:state.data,
    user:state.user
})
export default connect(mapStateToProps , { getUserData})(withStyles(styles)(Users))
