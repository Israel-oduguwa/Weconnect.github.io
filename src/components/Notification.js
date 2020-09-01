import React, { Component } from 'react'
import Link from 'react-router-dom/Link';
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Badge from '@material-ui/core/Badge';
import dayjs from "dayjs";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import relativeTime from "dayjs/plugin/relativeTime";
import { markNotificationsRead } from "../redux/actions/userActions";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from '@material-ui/core/Avatar';
export class Notification extends Component {
    state = {
       open:false
    }
    handleOpen = () =>{
        this.setState({
           open:true
        });
        let unreadNotificationsIds = this.props.notifications
        .filter(not => !not.read)
        .map(not => not.notificationId);
        this.props.markNotificationsRead (unreadNotificationsIds);
    }
    handleClose = (e) =>{
        this.setState({ open:false});
    }
    
    render() {

        const notifications = this.props.notifications;
       

        dayjs.extend(relativeTime);

        let notificationIcon;
        if(notifications && notifications.length > 0){
            notifications.filter((not) => not.read === false).length > 0
            ? (notificationIcon = (
                <Badge 
                badgeContent={notifications.filter((not) => not.read === false).length}
                color="secondary">
                    
                     <NotificationIcon/>
                    
                </Badge>
            )) :(
                notificationIcon = <NotificationIcon/>
            )
        } else{
            notificationIcon = <NotificationIcon/>
        }

        let notificationMarkup =
        notifications && notifications.length > 0 ? (
            notifications.map(not =>{
                const verb = not.type === 'like' ? 'liked': 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? 'primary':'secondary';
                const icon = not.type === 'like' ? (
                    <FavoriteIcon color={iconColor} styles={{ marginRight: 10}} />
                ):(
                    <ChatBubbleOutlineIcon color={iconColor} styles={{ marginRight: 10}} />
                )
                   
                return (
                        <ListItem
                        button
                        component={Link}                       
                        onClick={this.handleClose}
                        color="default"
                        key={not.createdAt}
                      
                        to={`user/${not.recipient}/posts/${not.timelineId}`}
                        >
                         {
                             not.senderImage ? 
                             <ListItemAvatar>
                                 <Avatar src={not.senderImage}  alt="senderImage" className="NotifyAvatar"/>
                                    
                             </ListItemAvatar>:
                             <ListItemAvatar>
                                 {icon}
                             </ListItemAvatar>
                         }
                         <ListItemText   variant="body1" >
                         {not.sender} {verb} on your post {time} 
                         </ListItemText>
                        </ListItem>                   
                )
            })
        ):(
            <ListItem onClick={this.handleClose}>
               <ListItemText primary="You have no notification yet" />
            </ListItem>
        )
        return (
            <>
                <Tooltip placement='top' title="Notifications">
                  
                   <IconButton 
                    onClick={this.handleOpen}>
                        {notificationIcon}
                    </IconButton>
                 
                </Tooltip>
                <Dialog onClose={this.handleClose} open={this.state.open}> 
                    <DialogTitle id="Notification">Notifications</DialogTitle>
                    <List>
                    {notificationMarkup}
                    </List>
                </Dialog>
            </>
        )
    }
}
Notification.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state =>({
    notifications:state.user.notifications
})
export default connect(mapStateToProps, {markNotificationsRead })(Notification);
