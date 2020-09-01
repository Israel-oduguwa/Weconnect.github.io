import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Weather from "../components/Weather";
import { getCoordsWeather } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LeftButtons from "../components/leftAction/leftButtons";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { Helmet } from "react-helmet";
export class weatherPage extends Component {
   
      
state = {
    lat:'',
    long:''
}
componentDidMount(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
            this.props.getCoordsWeather(position.coords.latitude, position.coords.longitude);
         })
    }
    

    //Fecthc api
}

    render() {

        const { loading , weather } = this.props.externalApi
        const weatherMarkup = !loading ? (
            <Weather weather={weather} />
        ):(           
                <Card style={{ marginRight:"20px"}}>      
                <CardHeader 
                avatar={
                    <Avatar>
                         <Skeleton variant="circle" />
                    </Avatar>
                }       
                title={
                    <>
                      <Skeleton animation="wave" height={20} width="80%" />   
                    </>
                } />
                    <CardMedia className="card-images">
                     <Skeleton animation="wave" variant="rect" style={{height:"300px"}} />
                    </CardMedia>   
                    <CardContent >            
                        <Skeleton animation="wave" height={30} width="100%" />             
                        <Skeleton animation="wave" height={20} width="80%" />             
                        <Skeleton animation="wave" height={20} width="80%" />             
                        <Skeleton animation="wave" height={20} width="80%" />             
                        <Skeleton animation="wave" height={20} width="80%" />             
                    </CardContent>      
                </Card>
        )
        return (
         <>
         {
             this.props.user.authenticated ?
             <Grid  container spacing={1}>
             <Helmet>
 <title> Weather - WeConnect </title>
</Helmet>
        <Grid className='extras-grid' item md={3}>
        {
          this.props.user.authenticated ?
          <LeftButtons/>:
          <p></p>
      }
        </Grid>
        <Grid  item xs={12} item md={6} item sm={8} >                   
       {
         
           weatherMarkup
           
       }
        </Grid >
        <Grid className='feed-grid' item xs>
             
        </Grid>
      </Grid>:
       <Redirect to ="/login" /> 
         }
         </>
        )
    }
}
Weather.propTypes  ={
    getCoordsWeather: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    externalApi: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
    UI:state.UI,
    externalApi:state.externalApi,
    user:state.user
})
export default connect(mapStateToProps , { getCoordsWeather })(weatherPage)
