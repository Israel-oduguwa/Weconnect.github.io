import React, { Component } from 'react';
import SearchedMovies from "../components/Movies/SearchedMovies";
import Grid from "@material-ui/core/Grid";

import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { Helmet } from "react-helmet";
const styles= (theme) =>({
    progress:{
        textAlign:'center',
        marginTop:60,
        marginBottom:50
    }
    ,media:{
        height:200,
        width:200,
    }
})
export class MovieResults extends Component {
   
    render() {
        const { classes } = this.props
        const { results, total_results } = this.props.externalApi.searchMovies;
        const {loading} = this.props.externalApi;
        const {Query} = this.props.location
        const searchMarkup = results && !loading ? (
            results.map((result) =>
            <> 
            <SearchedMovies key={result.id} result={result} />
           
            </>

            )
        ):(
            <div className="col-md-4">
            
            {
                Array.from({ length: 12}).map((item, index) => (
                    <Card className={classes.card} key={index} style={{ marginRight:"20px"}}>          
                        <CardMedia className={classes.cover}>
                         <Skeleton animation="wave" variant="rect" className={classes.media} />
                        </CardMedia>   
                        <CardContent className={classes.cover}>            
                            <Skeleton animation="wave" height={20} width="80%" />             
                        </CardContent>      
                    </Card>
                ))
            }
       </div>
        )
const query = total_results <= 0 ? (
    <h2>No results for "{Query}"</h2>
):(
    <h2>Results for "{Query}"</h2>
)
        return (
           <>
                <Grid container spacing={1}>
                <Helmet>
      <title> {Query} | WeFriend</title>
    </Helmet>
                    <Grid>
                   
                        <div className="container">
                            {query}
                        <Button variant="contained" className="MovieBack-button" 
                        component={Link}
                        to="/movies"
                    >Back</Button>
                            <div className="row">
                                {
                                    searchMarkup
                                }
                            </div>
                        </div>
                    </Grid>
                </Grid>
           </>
        )
    }
}
MovieResults.propTypes  = {
   
    externalApi: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    UI:state.UI,
    externalApi:state.externalApi,
    user:state.user
})
export default connect(mapStateToProps)(withStyles(styles)(MovieResults))
