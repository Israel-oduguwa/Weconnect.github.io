import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect} from "react-redux";
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import DnsIcon from '@material-ui/icons/Dns';
import Editdetails from "../components/editDetails";
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import dayjs from "dayjs";
import PostSkelenton from "../components/PostSkelenton";
//MUI stuffs
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid";
import WebIcon from '@material-ui/icons/Web';
import { Redirect } from "react-router-dom";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Tooltip from '@material-ui/core/Tooltip';
import { uploadImage, uploadCoverImage } from "../redux/actions/userActions";
import ProfileTimelines from '../components/profileTimelines';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LanguageIcon from '@material-ui/icons/Language';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TimelineBar from "../components/timelineBar";
import PersonIcon from '@material-ui/icons/Person';
import UserSkelton from "../components/UserSkelton";
import BuildIcon from '@material-ui/icons/Build';
import { Helmet } from "react-helmet";
const styles = (theme)=>( {
    large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    marginTop:"-14vh",
    border:"4px solid white",
  },
  location:{
      fontWeight:600,
      
  },
  media:{
      height:400,
  },
  root:{
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList:{
      width: 500,
    
  },
  eachList:{
    padding: "2px 16px 2px 0px"
  },
  Lroot:{
      padding:"0px 16px"
  },
  Licon:{
    minWidth: "35px",
  },

  inputRoot:{
      display:"flex",
      justifyContent:"space-around"
  },
  cameraPost:{
      background:"white"
  }

});
 class profile extends Component {
    state={
        open:false
      }
    handleOpen = () =>{
        this.setState({
          open:true
        })
      }
      handleClose =() =>{
        this.setState({
          open:false
        })
      }
     handleImageChange = (e) =>{
         const image = e.target.files[0];
         const formData = new FormData();
         formData.append('image', image, image.name);
         this.props.uploadImage(formData)
     };
     handleCoverPhoto = (e) =>{
         const coverImage = e.target.files[0];
         const formData = new FormData();
         formData.append('image', coverImage, coverImage.name);
         this.props.uploadCoverImage (formData)
     }
     handleEditCover = () =>{
         const file = document.getElementById("coverImage");
         file.click()
     }
     handleEditPicture =() =>{
         const fileInput = document.getElementById("imageInput");
         fileInput.click();
     }
    render() {
        const { 
            classes, 
            user:{ 
                credentials:{ fullName , birthDate, coverPhoto,  createdAt, bio, imageUrl, website,
                     location,
                     otherNames,
                     skills,
                     sex,
                     relationshipStatus,
                     famousQuotes,
                     languages
                    }, 
                loading,
                authenticated
            },
           
        } = this.props;
        

        let profileMarkup = !loading ?(authenticated ? (      
            <Grid container spacing={1}>
                <Helmet>
      <title> {fullName} - WeFriend</title>
    </Helmet>
        <Grid item xs={12} item md={12} item sm={12}
        container
        direction="column"
        justify="center"
        alignItems="center"

        > 
            <div className="cover-container">
            <img src={coverPhoto} alt="CoverPhoto" height="300px" width="100%" style={{borderRadius:"16px"}}/>
          
           
            </div>
       

       <Badge
       
       position="center"
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
            <>
            <input type="file" id="imageInput"
            hidden="hidden"
             onChange={this.handleImageChange} />
              <Tooltip title="Edit profile picture" placement="right-end">
              <IconButton  onClick={this.handleEditPicture} className={classes.cameraPost}   color="inherit">
               <CameraAltIcon  />
               </IconButton>
              </Tooltip>
            </>
        }
      >
        <Avatar alt={fullName} style={{cursor:"pointer"}} src={imageUrl}  className={classes.large} />
      </Badge>
     
        <div className="profile-name">
            <br/>
         <h2>{fullName}</h2>   
        </div>
       
        {bio && <Typography variant="body1">{bio}</Typography>}
        
        </Grid>
        <Grid item xs={12} className="profile-desktop" >
            <Grid container spacing={2}>
                <Grid item xs={12} item md={5} item sm={12}>
                <Card>
                <CardContent>
                <div className={classes.inputRoot}>
          <input type="file" id="coverImage" accept="image/*"
          className={classes.coverInput}
          multiple
            onChange={this.handleCoverPhoto}
            hidden="hidden"
            />
          <Tooltip title="Cover Photo" >
          <Button
          size="small"
          variant="outlined" color="primary"
        onClick={this.handleEditCover}
        className={classes.coverButton}
        startIcon={<CameraAltIcon />}
      >
       Edit Cover photo
      </Button>
            </Tooltip>
        <Editdetails/>
          </div>
              
          <List>
                  
                  {
               location && 
                <ListItem className={classes.eachList}>
                <ListItemIcon className={classes.Licon} >
                <LocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary={location}             
                />
              </ListItem>             
           }
             {
               sex && (
                   <>
                    <ListItem className={classes.eachList} >
                <ListItemIcon className={classes.Licon}>
                <PersonIcon/> 
                </ListItemIcon>
                <ListItemText>
                <span className="aboutSpan">Gender</span> {sex}
                </ListItemText>
              </ListItem>                          
                   </>
               )
           }
            {
               website && (
                   <Fragment>
                        <ListItem className={classes.eachList}>
                <ListItemIcon className={classes.Licon}>
                <WebIcon />
                </ListItemIcon>
                <ListItemText>
                <a href={website} target="_blank" rel="noopener noreferrer">
                           {' '}{website}
                       </a>
                </ListItemText>
              </ListItem>  
                   </Fragment>
               )
           }
              {
               skills && (
                   <>
                    <ListItem className={classes.eachList}> 
                    <ListItemIcon className={classes.Licon}>
               <BuildIcon/>
                </ListItemIcon>          
                <ListItemText>
                <span className="aboutSpan">Skills</span> {skills}
                </ListItemText>
              </ListItem> 
                  
                   </>
                    
               )
           }            
             {
               languages && (
                   <>
                    <ListItem className={classes.eachList} >
                <ListItemIcon className={classes.Licon}>
                <LanguageIcon/>
                </ListItemIcon>
                <ListItemText primary={languages} />           
              </ListItem>                
                   </>
                    
               )
           }
           {
               otherNames && (
                   <>
                       <ListItem className={classes.eachList} >
                <ListItemIcon className={classes.Licon}>
                <DnsIcon/> 
                </ListItemIcon>
                <ListItemText>
                <span className="aboutSpan">OtherNames</span> {otherNames}    
                </ListItemText>
              </ListItem>                 
                   </>
               )
           }
             
           
           {
               famousQuotes && (
                   <>
                    <ListItem className={classes.eachList} >
                <ListItemIcon className={classes.Licon}>
                <FormatQuoteIcon/> 
                </ListItemIcon>
                <ListItemText>
                <span className="aboutSpan">Favorite Quote</span> "{famousQuotes}"
                </ListItemText>
              </ListItem>  
    
                   </>
                   
               )
           }
           
           {
               birthDate && (
                <ListItem className={classes.eachList} >
                <ListItemIcon className={classes.Licon}>
                <FormatQuoteIcon/> 
                </ListItemIcon>
                <ListItemText>
                BirthDay {birthDate}
                </ListItemText>
              </ListItem> 
                   
               )
           }
           
           {
               relationshipStatus && (
                <Fragment>
                     <ListItem className={classes.eachList} >
                <ListItemIcon>
                <FavoriteIcon/>
                </ListItemIcon>
                <ListItemText primary= {relationshipStatus}/>           
              </ListItem>                            
                </Fragment>
                
            )
           }
            <ListItem className={classes.eachList}>
                <ListItemIcon className={classes.Licon}>
                <CalendarTodayIcon/>
                </ListItemIcon>
                <ListItemText>
                <span>
               Joined {dayjs(createdAt).format('MMM YYYY')}
           </span>
                </ListItemText>                           
              </ListItem>              
                           </List>   
       <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          >
             <DialogTitle  id="scroll-dialog-title">
               <Button onClick={this.handleClose} variant="contained" color="default">Back</Button>
             </DialogTitle>
             <DialogContent>
               <img src={imageUrl} width="100%" height="100%" alt="View"/>
             </DialogContent>
          </Dialog>
                </CardContent>
            </Card>
                <Card>
                <CardContent>
                <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
          <GridListTile  cols={2 || 1}>
            <img src={coverPhoto} alt="profile" />
          </GridListTile>      
          <GridListTile  cols={1 || 1}>
            <img src={imageUrl} alt="cover" />
          </GridListTile> 

      </GridList>
      
    </div>
                </CardContent>
                </Card>
        </Grid>
        <Grid item sm={12} item md={6} xs={12}>
            <>{
                 authenticated ?                
                 <TimelineBar/>:
                <PostSkelenton/>
            }
            </>
         
                  
                  <ProfileTimelines userName={fullName} />
               </Grid>
                </Grid>
            </Grid>
        </Grid>
        
        ) : (
            <Redirect to ="/login" />
        )) : (
           <UserSkelton/>
        )
        return profileMarkup;
       
    }
}

const mapStateToProps = (state) => ({
    user:state.user,
    data: state.data,
})

const mapActionsToProps = { uploadImage, uploadCoverImage };
profile.propTypes ={
    uploadImage:PropTypes.func.isRequired,
    uploadCoverImage:PropTypes.func.isRequired,

    user: PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(profile))
