import React, { Component } from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect} from "react-redux";
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
//MUI stuffs
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Grid from "@material-ui/core/Grid";
const styles = (theme)=>( {
    large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    marginTop:"-14vh",
    border:"4px solid white",
  },
  location:{
      fontWeight:600,
      
  }

});
 class StaticProfile extends Component {
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
    render() {
      
        const { 
            classes, 
            profile:{ fullName , coverPhoto,  imageUrl, bio}, 
 
        } = this.props;

        
        return (
                      
            <Grid item xs={12} item md={12} item sm={12}
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
          
          <div className="cover-container">
            <img src={coverPhoto} alt="CoverPhoto" height="300px" width="100%" style={{borderRadius:"16px"}}/>
          

           <Badge
           position="center"
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Avatar alt={fullName} style={{cursor:"pointer"}} src={imageUrl} onClick={this.handleOpen}  className={classes.large} />
          </Badge>
          
            <div className="profile-name">
             <h2>{fullName}</h2>   
             <p>{bio}</p>
            </div>
            
            </div>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          >
             <DialogTitle  id="scroll-dialog-title">
               {/* <Button onClick={this.handleClose} variant="contained" color="default">Back</Button> */}
             </DialogTitle>
             <DialogContent>
               <img src={imageUrl} width="100%" height="100%" alt="View"/>
             </DialogContent>
          </Dialog>
                </Grid>
            
        )
       
    }
}

const mapStateToProps = (state) => ({
    user:state.user
})

StaticProfile.propTypes ={
    uploadImage:PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
}
export default connect(mapStateToProps)(withStyles(styles)(StaticProfile))
