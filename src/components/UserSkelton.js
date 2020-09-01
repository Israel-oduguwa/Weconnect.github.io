import React from 'react';
import Card from '@material-ui/core/Card';
import Badge from '@material-ui/core/Badge';

import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

import PostSkelenton from "./PostSkelenton";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) =>({
    large: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        marginTop:"-14vh",
       
      },
      media:{
          height:300
      }
})

const UserSkelton = (props) =>{
    const { classes } =props;
    
    const content = Array.from({ length: 1}).map((item, index) => (
        <Grid container spacing={1}>
        <Grid item xs={12} item md={12} item sm={12}
        container
        direction="column"
        justify="center"
        alignItems="center">
    <Skeleton variant="rect" animation="wave" className={classes.media} />
    <Badge
       
       position="center"
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        >
             <Skeleton animation="wave" variant="circle"  className={classes.large} />
        </Badge>
        <br/>
        <Skeleton  variant="rect" width="50%" />
        <br/>
        <Skeleton  variant="rect" width="70%" />
</Grid>
        <Grid item xs={12} className="profile-desktop">
            <Grid container spacing={2}>
            <Grid item xs={12} item md={5} item sm={12}>
                <Card>
                    <CardContent>
                    <Skeleton   width="70%" style={{ marginBottom:6}} />
                    <br/>
                    <Skeleton   width="70%" style={{ marginBottom:6}} />
                    <br/>
                    <Skeleton   width="70%" style={{ marginBottom:6}} />
                    <br/>
                    <Skeleton   width="70%" style={{ marginBottom:6}} />
                    <br/>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                    </CardContent>
                </Card>

            </Grid>
            <Grid item sm={6} item md={6} xs={12}>
                <PostSkelenton/>
            </Grid>
            </Grid>
        </Grid>


   </Grid>
    ));
    return <>{content}</>
};

UserSkelton.propTypes ={
    classes:PropTypes.object.isRequired
};

export default withStyles(styles)(UserSkelton);