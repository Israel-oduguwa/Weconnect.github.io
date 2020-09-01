import React, { Component, Fragment } from 'react';
import Link from 'react-router-dom/Link';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button"
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import { connect } from "react-redux";
import logo from "../images/logo.png";
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Notifications from "./Notification";

import PropTypes from "prop-types";
import { logoutUser } from "../redux/actions/userActions";
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NavDrawer from "./NavDrawer";
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import Tooltip from "@material-ui/core/Tooltip";
const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#2b47e6',
      color: '#4a5fd4',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);
const styles = (theme) =>({
root:{
    flexGrow: 1,
},
menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  mainButton:{
      display:'flex',
      justifyContent: 'space-evenly',
      width: "100%",
      alignItems:"center"
  },
  badge:{
      padding:"0 10px"
  },
  home:{
    color:"#184bbf!important"
  },
 login:{
    //  background:"#3f51b5!important",
     background:"#106bdc!important",
     color:"white!important",
     borderRadius:"100px!important",
     padding:"7px 20px 6px 20px"
 }
})
export class Navbar extends Component {
    state={
        open:false
    }
    handleToggle =() =>{
       if (this.state.open === false){
        this.setState({
            open:true
        })
       }
       else{
        this.setState({
            open:false
        })
       }
    }
    handleClose = () =>{
      this.setState({
        open:false
      })
    }
    handleLogOut = () =>{
        this.props.logoutUser();
        this.setState({
          open:false
        })
    }
    handleListKeyDown =() =>{
        this.setState({
            open:false
        })
    }
    handleListKeyDown = (e)  =>{
        if(e.key === "Tab") {
            e.preventDefault();
            this.setState({
                open:false
            })
        }
    }
    render() {
        const {classes, user:{ authenticated, credentials:{ fullName, imageUrl, email , createdAt } }} = this.props
        return (
          <div className={classes.root}>
               <AppBar color="appBar"> 
               <Toolbar className="nav-container">
               {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <div className="logo">
            <img src={logo} alt="logo" className="logoImage"/>
          </div>
               <Typography className={classes.title} variant="h6"  color="primary"   noWrap>WeConnect</Typography>
              <div className={classes.root}>
             
              <div className={classes.mainButton}>
             <Link to="/">
             <Button 
               color="primary"               
                startIcon={<HomeIcon/>} >
                  Home
               </Button>
             </Link>
               
               <Fragment>
                   {
                       authenticated ?
                       <div className="nav-figureHead">
                       figurehead
                   </div>
                       :
                       <Link to="/login">
                        <Button
                        color="primary"
                        >Login
                        </Button>
                       </Link>
                       
                   }
               </Fragment>
               <Fragment>
                   {
                       authenticated ?
                     <div className="nav-figureHead">
                     figurehead
                 </div>
                       :
                      
                      <Link to="/signup">
                         <Button 
                       color="primary"
                     
                        className={classes.login}                   
                     
                      
                      >
                         Sign up
                      </Button>
                      </Link>
                   }
               </Fragment>
              </div>
              </div>
               <Fragment>
                {

                    authenticated  ? 
                    <Link  to="/profile">
                        <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        variant="dot"
                        className={classes.badge}
                    >
                     <Avatar alt="pic" src={imageUrl} />
                     </StyledBadge>
                    </Link>
                   
                    :
                    <div className="nav-figureHead">
                    figurehead
                </div>
                    }
                </Fragment>
               <>
               {
                   authenticated ? 

                  <Notifications/> :

                    <div className="nav-figureHead">
                    figurehead
                    </div>
               }
               </>
             <>
              {
                 
                    authenticated ? 
                    <>
                    <Tooltip title="menu" placement='top'>
                    <Avatar>
                    <IconButton                   
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                  >                   
                       <ArrowDropDownIcon/>                  
                  </IconButton>
                  </Avatar>
                  </Tooltip>
                  <Popper open={this.state.open} transition disablePortal role={undefined} >
                      {({ TransitionProps, placement}) =>(
                      <Grow
                       { ...TransitionProps}
                      style={{ transformOrigin: placement === "bottom" ? 'center top' : 'center bottom'}} >
                      <Paper >
                          <MenuList autoFocusItem={this.state.open} id="menu-list-grow" onKeyDown={this.handleListKeyDown}>                             
                        <MenuItem   onClick={this.handleLogOut}>
                                  <ListItem button component={Link} to="/profile">
                        <ListItemIcon>
                        <ExitToAppIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                              </MenuItem>
                          </MenuList>
                      </Paper>
                      </Grow>
                      )}
                  </Popper>

                    </>:
                    <p></p>
                }
                {
                  authenticated ?
                  <NavDrawer name={fullName} photo={imageUrl} emails={email} joined={createdAt} />:
                  <p></p>
                }
              </>
            
               </Toolbar>
           </AppBar>

          </div>
        )
    }
}




const mapStateToProps = (state) => ({
    user:state.user
})
const mapActionsToProps = { logoutUser };
Navbar.propTypes ={
    logoutUser:PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar))
