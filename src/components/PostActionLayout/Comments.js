import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';

import dayjs from "dayjs";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
    commentContainer:{
        marginTop:"5.4vh" ,
       
    },
    userImage:{
        maxWidth:'100%',
        height:45,
        objectFit:'cover',
        borderRadius:'50%',
        marginTop:"1vh"
    },
    commentData: {
        marginLeft:1,
       width:"fit-content"
       
    },
    commentBar:{
        background:"#ececec",
        borderRadius:"15px",
    
    },
    commentPadding:{
        padding: "7px 12px 7px 12px"
    },
    eachComments:{
       
        marginTop:"2vh",
        borderRadius:"5px"
    },
    userName: {
        fontSize:"2vh",
        fontWeight:700
    },
    commentTime: {
        fontSize:"1.6vh"
    },
    invisibleSeparator:{
        border:"none",
        margin:"4px"
    },
    bodyComments: {
        fontSize:"2vh"
    }
})
 class Comments extends Component {
    render() {
        const { comments, classes } = this.props
        const realComments = comments ? (

            comments.map((comment) => {
                const { body , createdAt, userImage, fullName } = comment;
                return(
                    <Fragment key={createdAt}>
                    <Grid  item xs={12} className={classes.eachComments}>
                        <Grid container>
                          <Grid item sm={2}>
                          <img src={userImage}  alt={fullName} className={classes.userImage} /> 
                          </Grid>
                        
                        <Grid item sm={9} item xs={9}  >
                            <div className={classes.commentData}>
                              <div className={classes.commentBar}>
                              <div className={classes.commentPadding}>
                              <Typography variant="h5" className={classes.userName} >
                                    {fullName}
                                </Typography>
                                <Typography className={classes.bodyComments} variant='body1' >{body}</Typography>
                              </div>
                              </div>
                                <Typography variant="body2" className={classes.commentTime} >
                                    {dayjs(createdAt).fromNow()}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    </Grid>
                 </Fragment>
                )
            })
        ): (<p></p>)
        return (
          <>
           <Grid container className={classes.commentContainer}>
           {
               realComments
           }
           </Grid>
         
          </>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}
export default withStyles(styles)(Comments)
