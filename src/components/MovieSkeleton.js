import React from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) =>({
media:{
    height:200,
    width:200,
}
});

const MovieSkeleton = (props) =>{
    const { classes } =props;
    
    const content = Array.from({ length: 6}).map((item, index) => (
        <Card className={classes.card} key={index} style={{ marginRight:"20px"}}>          
            <CardMedia className={classes.cover}>
             <Skeleton animation="wave" variant="rect" className={classes.media} />
            </CardMedia>   
            <CardContent className={classes.cover}>            
                <Skeleton animation="wave" height={20} width="80%" />             
            </CardContent>      
        </Card>
    ));
    return <>
        <div className="discovered">                           
               <div className="discovered-container">
               
                   <ul className="dicoverList">
                   {content}
                   </ul>
               </div>
           </div>
        </>
};

MovieSkeleton.propTypes ={
    classes:PropTypes.object.isRequired
}; 

export default withStyles(styles)(MovieSkeleton);