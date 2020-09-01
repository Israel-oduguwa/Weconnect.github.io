import React, { Component } from 'react'
import Link from 'react-router-dom/Link';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from "@material-ui/core/Avatar";
import Skeleton from '@material-ui/lab/Skeleton';



const styles = (theme) => ({
root:{
    position:"fixed",
    
},
covid19:{
    fontSize:"2.3vh",
    fontWeight:600,

}

})

export class leftButtons extends Component {
   
    render() {
        const {classes, user:{loading, credentials:{ fullName, imageUrl } }} = this.props
        
        return (
            <div className={classes.root}>
                <List component="nav" aria-label="leftButtonAction" className="left-scroll">
                    <ListItem button component={Link} to="/profile">
                        <ListItemIcon>
                          {
                             !loading ?
                              <Avatar src={imageUrl} />:
                              <Avatar>
                           <Skeleton  variant="circle" width="75%"  />
                           </Avatar>
                          }
                        </ListItemIcon>
                       {
                           !loading ?
                           <ListItemText primary={fullName}  />:
                           <Skeleton  height={30} width="80%" style={{ marginBottom: 6 }} />
                       }                   
                    </ListItem>
                    <ListItem button component={Link} to="/covid19">
                        <ListItemIcon>
                          {
                              !loading ? 
                              <Avatar src="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/covid.png?alt=media&token=7ba98d68-4ad9-4668-9810-322d8d179a0b" />:
                              <Avatar>
                           <Skeleton variant="circle" width="75%"  />
                           </Avatar>
                          }
                        </ListItemIcon>
                       {
                           !loading ?
                           <ListItemText  primary="covid19" />  :
                           <Skeleton  height={30} width="80%" style={{ marginBottom: 6 }} />
                       }                                                
                    </ListItem>
                    <ListItem button component={Link} to="/weather">
                        <ListItemIcon>
                         {
                             !loading ?
                             <Avatar src="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/snowflake.png?alt=media&token=6af92b5e-7c0e-46de-9c35-0b8f9d97e7fc" />:                          
                           <Avatar>
                           <Skeleton variant="circle" width="75%"  />
                           </Avatar>
                         }
                        </ListItemIcon>
                       {
                           !loading ?
                           <ListItemText primary="Weather"  />  
                          :
                          <Skeleton height={30} width="80%" style={{ marginBottom: 6 }} />
                       }                  
                    </ListItem>
                   
                    <ListItem button component={Link} to="/movies">
                        <ListItemIcon>
                         {
                             !loading ?
                             <Avatar src="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/movies.jpg?alt=media&token=5a85cd94-f4b5-4182-8609-5477f12b6766" />:
                             <Avatar>
                             <Skeleton  variant="circle" width="75%"  />
                        </Avatar>
                         }
                        </ListItemIcon>
                       {
                           !loading ?
                           <ListItemText primary="Movies"/>  :
                           <Skeleton  height={30} width="80%" style={{ marginBottom: 6 }} />
                       }                                                 
                    </ListItem>
                   
            
                </List>
            </div>

        )
    }
}


const mapStateToProps = (state) => ({
    user:state.user
})

leftButtons.propTypes ={
  
    user: PropTypes.object.isRequired,
    
}
export default connect(mapStateToProps)(withStyles(styles)(leftButtons))











