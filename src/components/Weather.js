import React, { Component, Fragment } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from "prop-types";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CircularProgress } from '@material-ui/core';
import { connect } from "react-redux";
import relativeTime from "dayjs/plugin/relativeTime";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

const styles = (theme) => ({

})

export class Weather extends Component {
state={
    greet:""
}
componentDidMount() {
    const today = new Date()
    const currentHr = today.getHours()
    if (currentHr >= 6 && currentHr < 12) {
        this.setState({
           greet:"Good Morning"
    });
    } 
    else if (currentHr >= 12 && currentHr<17) {
        this.setState({
            greet:"Good Afternoon"
        });
    }
     else {
        this.setState({
            greet:"Good Evening"
     });
    }
}

    render() {
        dayjs.extend(relativeTime)
        const { weather:{ timezone, current, hourly, daily  } } = this.props;
        const mainWeatherParams = current ? 
        (
            <>
                <Grid item xs={12} >
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography variant="h2">
                                {
                                    Math.floor(current.temp-273)
                                }°
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                                <List >
                                    <ListItemText primary="F/C" />
                                    <ListItemText primary={current.weather[0].clouds}/>
                                    <ListItemText>
                                        <Typography>
                                            L {Math.floor(current.temp-273)} H {Math.floor(current.feels_like-273)}
                                        </Typography>
                                    </ListItemText>
                                </List>
                        </Grid>
                    </Grid>
                    <Typography variant="h5">
                        {this.state.greet}
                    </Typography>
                    <Typography variant="body2">
                       There is an high temperature of {Math.floor(current.feels_like-273)}° and a low temperature of {Math.floor(current.temp-273)}°, the wind speed is  {current.wind_speed} m/s with wind degree of {current.wind_deg}° and {current.weather[0].description}. 
                    </Typography>
                </Grid>
            </>
        ):(
            <Skeleton animation="wave" height={30} width="100%" /> 
        )
        const hourForecast = hourly ? (
            hourly.map((hours) => {
                const {temp, weather, dt} = hours;
                const imageUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
                return(
                    <Fragment key={dt}>
                       
                            <ul className="hoursWeather">
                                <li className="hourParams">
                                    {Math.floor(temp-273)}°
                                </li>
                                <li className="hourParams">
                                    <img src={imageUrl} alt="icons" width="50px"/>
                                </li>
                                <li className="hourParams">
                                        {dayjs(dt*1000).hour()}
                                </li>
                            </ul>
                       
                    </Fragment>
                )
            })
        ):(
            <CircularProgress size={30} />
        )
        const dayForecast = daily ? (
            daily.map((days) =>{
                const {dt, weather, temp } =days;
                const imageUrls = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
                
                return(
                    <Fragment key={dt}>
                        <ListItem className="weatherList">
                                <ListItemText>
                                    <Typography variant="body2">
                                        {
                                            dayjs(dt*1000).day() === 4 ?
                                            <>
                                            Thursday
                                            </> :
                                            dayjs(dt*1000).day() === 5 ?
                                            <>
                                            Friday
                                            </>: 
                                             dayjs(dt*1000).day() === 6 ?
                                             <>
                                             Saturday
                                             </>:
                                             dayjs(dt*1000).day() === 0 ?
                                             <>
                                            Sunday
                                             </>:
                                              dayjs(dt*1000).day() === 1 ?
                                              <>
                                              Monday
                                              </>:
                                               dayjs(dt*1000).day() === 2 ?
                                               <>
                                              Tuesday
                                               </>:
                                                dayjs(dt*1000).day() === 3 ?
                                                <>
                                                Wednesday
                                                </>:
                                                <>
                                                Time
                                                </>
                                            }
                                    </Typography>
                                    <Typography variant="body2">
                                        {weather[0].description}
                                    </Typography>                     
                                </ListItemText>
                                <ListItemIcon>
                                <img src={imageUrls} alt="dayIcons" width="45px"/>
                                <div className="icon-text">
                                <Typography variant ="body2">
                                            {
                                               Math.floor(temp.max-273)
                                            }°
                                            {
                                                 Math.floor(temp.min-273)
                                            }°
                                       </Typography>
                                </div>
                                </ListItemIcon>
                            </ListItem>
                            <hr style={{marginTop:"0px", marginBottom:"0px"}}/>
                    </Fragment>
                )
            })
        ):(
           <p></p>
        )
        return (
            <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="location" >
                        <LocationOnIcon/>
                    </Avatar>
                    
                }
                title={timezone}
        />
         <CardMedia
          className="card-images"
          image="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/more-weather-climate.jpg?alt=media&token=df5f6969-b796-49c9-b5cd-8ef43aac9ca4"
          style={{height:"300px"}}
          title="weather"
        />

        <CardContent>
            {
                mainWeatherParams
            }  
             <div className="hourly">
             {
                hourForecast
            } 
                        </div>
          <List>
          {
               dayForecast
           }
          </List>
        </CardContent>
        </Card>
        )
    }
}

Weather.propTypes ={
    weather:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    user:state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Weather))
