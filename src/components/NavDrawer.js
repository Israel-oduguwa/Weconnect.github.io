import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import logo from "../images/logo.png";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import dayjs from "dayjs";
import Link from 'react-router-dom/Link';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
const style = (theme)=>({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  Licon:{
      minWidth:"68px"
  },
  inline: {
    display: 'inline',
  },
});

export class NavDrawer extends Component {
    state={
        anchor:false
    }

   handleOpen = () =>{
    this.setState({
        anchor:true
    })
   }
    handleClose = () =>{
        this.setState({
            anchor:false
        })
    }
  toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        this.setState({
            anchor:true
        })
    }

    render() {
        const { classes }=this.props;
                     
        return (
            <>
            <IconButton onClick={this.handleOpen}><MenuIcon/></IconButton>
          <SwipeableDrawer
            anchor="left"
            className="NavDrawer"
            open={this.state.anchor}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
           
            
          >
           <div             
              role="presentation"
              className={classes.List}            
            >
               <div className="Navlogo">
            <img src={logo} alt="logo" className="logoImage"/> <span> <Typography variant="h6"  color="primary"   noWrap>WeConnect</Typography></span>
            
          </div>
         
              <List>
              <Divider />
              <ListItem button component={Link} onClick={this.handleClose} to="/profile">
                        <ListItemIcon className={classes.Licon}>
                           <Avatar src={this.props.photo} />
                        </ListItemIcon>
                        <ListItemText primary={
                          <>
                          <Typography variant="h6" style={{fontWeight:"bold"}}>
                            {this.props.name}
                          </Typography>
                          </>
                        } 
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                            {dayjs(this.props.joined).format('MMM YYYY')}
                            </Typography>
                            — {this.props.emails}
                          </React.Fragment>
                        }
                          />
                           
                    </ListItem>
                    
                        <ListItem button component={Link} onClick={this.handleClose} to="/movies">
                        <ListItemIcon className={classes.Licon}>
                       <Avatar src="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/movies.jpg?alt=media&token=5a85cd94-f4b5-4182-8609-5477f12b6766"/>
                        </ListItemIcon>
                        <ListItemText primary="Movies" />
                        </ListItem>
                        
                              
                        
                        <ListItem button component={Link} onClick={this.handleClose} to="/weather">
                        <ListItemIcon className={classes.Licon}>
                        <Avatar src="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/snowflake.png?alt=media&token=6af92b5e-7c0e-46de-9c35-0b8f9d97e7fc" />
                        </ListItemIcon>
                        <ListItemText primary="Weather" />
                        </ListItem>
                        
                        
                        <ListItem button component={Link} onClick={this.handleClose} to="/covid19">
                        <ListItemIcon className={classes.Licon}>
                        <Avatar src="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/covid.png?alt=media&token=7ba98d68-4ad9-4668-9810-322d8d179a0b" />
                        </ListItemIcon>
                        <ListItemText primary="covid19" />
                        </ListItem>
                        
              </List>
             
            </div>
          </SwipeableDrawer>
            </>
        )
    }
}

export default (withStyles(style)(NavDrawer))
