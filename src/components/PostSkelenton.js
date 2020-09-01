import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

import Avatar from '@material-ui/core/Avatar';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) =>({
media:{
    height:300
}
})

const Postskelenton = (props) =>{
    const { classes } =props;
    
    const content = Array.from({ length: 6}).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardHeader avatar={
                <Avatar>
                     <Skeleton animation="wave" variant="circle" width={43}  />
                </Avatar>
            }
            title={
                <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            }
            subheader={
                <Skeleton animation="wave" height={10} width="40%" />
            }
            />
             <CardContent className={classes.cover}>
             <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={20} width="80%" />             
            </CardContent>
            <CardMedia className={classes.cover}>
             <Skeleton animation="wave" variant="rect" className={classes.media} />
            </CardMedia>         
        </Card>
    ));
    return <>{content}</>
};

Postskelenton.propTypes ={
    classes:PropTypes.object.isRequired
};

export default withStyles(styles)(Postskelenton);