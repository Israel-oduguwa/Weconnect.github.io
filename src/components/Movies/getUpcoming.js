import React, { Component } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Skeleton from '@material-ui/lab/Skeleton';
//Mui
import { getMovieInfo }  from "../../redux/actions/dataActions";
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';

import ReactPlayer from 'react-player/youtube';

import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid"
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from "@material-ui/core/Avatar";

export class getUpcoming extends Component {
    state ={
        open:false
    }
    handleOpenClick = () =>{
        this.setState({
            open:true
        })
       this.props.getMovieInfo(this.props.id)
    }
    handleClose = () =>{
        this.setState({
            open:false
        })
    }
    render() {
       
        const posterImages = `https://image.tmdb.org/t/p/w500/${this.props.posterPath}`;
        
           const { movieInfo } = this.props.externalApi;
           const posterPath = `https://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path}`
           const genres = movieInfo.genres ? (
               movieInfo.genres.map((genres) => {
                   const { name } = genres
                   return(
                       <>
                      <span className="genres-span">{name}</span>, 
                       </>
                   )
               })
           ):(
              <p></p>
           )


           const Videos = movieInfo.videos ? (
            movieInfo.videos.results.map((trailers) => {
                const { key } = trailers
                const video =  `https://youtube.com/embed/${key}`;
                return(
                    <>
                   <div className="player-wrapper">
                    <ReactPlayer className='react-player'
         
          width='100%'
          height='100%' controls={true} loop={true} url={video} />
                   </div>
                    </>
                )
            })
           ):(
               <p></p>
           )
           const Cast = movieInfo.credits ? (
            movieInfo.credits.cast.map((casts) => {
                const { character, name, profile_path } = casts
                const castProfile =  `https://image.tmdb.org/t/p/w500//${profile_path}`;
                return(
                    <>
                     <ListItem>
                        <ListItemIcon>
                            <Avatar src={castProfile} />
                           
                        </ListItemIcon>
                        <ListItemText primary={name}  className="casts-left" /> 
                        <ListItemText primary={character}  className="casts-right" />
                    </ListItem>
                    <Divider orientation="horizontal" className='cast-divider' />
                    </>
                )
            })
           ):(
               <p></p>
           )
           const Countries = movieInfo.production_countries ? (
            movieInfo.production_countries.map((countries) =>{
                const { name } = countries;
                return(
                    <>
                    {name}
                     <Divider orientation="vertical" className='info-divider' flexItem />
                     </>
                )
            })
           ):(
               <p></p>
           )
           const languages = movieInfo.spoken_languages ? (
               movieInfo.spoken_languages.map((language) => {
                   const  {name} = language
                   return(
                       <>
                            {name}
                            <Divider orientation="vertical" className='info-divider' flexItem/>
                       </>
                   )
               })
           ):(
               <p></p>
           )
           const { movieLoading}= this.props.externalApi
           const infoMarkup = movieInfo && !movieLoading ? (
                   <>
                        <AppBar className="MovieBar">
                            <Toolbar>
                            
                             <Typography variant="h6">
                             {movieInfo.title}
                             </Typography>
                               <Button variant="contained" className="MovieBack-button" onClick={this.handleClose}>Back</Button>
                            </Toolbar>
                            <Grid container alignItems="center" className="small-info"> 
                                 <Typography variant="body2">
                                 {
                                     movieInfo.runtime ?
                                     <>
                                     {movieInfo.runtime}min
                                     </>:<p></p>
                                 }
                                 </Typography>
                                  <Divider orientation="vertical" className='info-divider' flexItem/>
                                 <Typography variant="body2">
                                 {genres}
                                 </Typography>
                              </Grid>
                        </AppBar>
                       
                          <Card className="wholeMovieCard" >
                              <CardMedia
                              image={posterPath}
                              title={movieInfo.title}
                              className="MovieInfoCard"/>
                              <CardContent>
                                 <Typography variant="body1">
                                 {movieInfo.overview}
                                 </Typography>
                                 <Typography variant="body1">
                                {
                                     movieInfo.status ?
                                     <>
                                     Status: {movieInfo.status}
                                     </>
                                     :
                                     <p></p>
                                }
                                 </Typography>
                                <Typography variant="body1">
                                    {
                                        movieInfo.release_date ?
                                        <>
                                        Release date  {movieInfo.release_date }                            
                                        </>:
                                        <p></p>                                     
                                    }
                                </Typography>                             
                                <Grid container alignItems="center">
                                      {languages}
                                </Grid>
   
                                <Grid container alignItems="center">
                                <Typography variant="body1">
                                    {
                                       Countries ?
                                        <>
                                       Country {Countries}                      
                                        </>:
                                        <p></p>                                     
                                    }
                                </Typography>     
                               
                                </Grid>
                               {
                                   movieInfo.tagline ? 
                                   <>
                                  <span>Tagline</span> <span>{movieInfo.tagline}</span>
                                 </>
                                  :
                                  <p></p>
                               }
                            
                                 { Videos ?
                                 <>
                                     <Typography variant="h6">Video</Typography>
                                     {Videos}
                                   </>:
                                   <p></p>
                                 }
                                
                             
                            {
                                Cast ?
                                <>
                                <Typography variant="h6">Cast</Typography>
                                 <List component="nav">
                                 {Cast}
                             </List>
                                </>:
                                <p></p>
                            }
                              </CardContent>
                          </Card>
                        
                   </>
           ):(
               <>
                        <AppBar className="MovieBar">
                            <Toolbar>                         
                            <Skeleton  height={20} width="80%" />    
                               <Button variant="contained" className="MovieBack-button" onClick={this.handleClose}>Back</Button>
                            </Toolbar>
                            <Grid container alignItems="center" className="small-info"> 
                            <Skeleton  height={10} width="20%" />    
                                
                                  <Divider orientation="vertical" className='info-divider' flexItem/>
                                  <Skeleton  height={10} width="30%" />   
                              </Grid>
                        </AppBar>
                       
                          <Card className="wholeMovieCard" >
                              <CardMedia>
                                   <Skeleton animation="wave" variant="rect"className="MovieImage"/>
                              </CardMedia>
                              <CardContent>
                              <Skeleton  height={25} width="85%" />  
                              <Skeleton  height={25} width="85%" />  
                              <Skeleton  height={25} width="85%" />  
                              <Skeleton  height={25} width="85%" />  
                              <Skeleton  height={25} width="20%" />  
                              <Skeleton  height={25} width="20%" />  
                                                            
                                <Grid container alignItems="center">
                                <Skeleton  height={25} width="20%" />  
                                </Grid>
   
                                <Grid container alignItems="center">
                                <Skeleton  height={25} width="60%" />    
                               
                                </Grid>
                                <Skeleton  height={25} width="20%" />  
                            
                                <Skeleton animation="wave" variant="rect"className="Movietrailer"/>
                                
                             
                                <Skeleton  height={25} width="90" />  
                                <Skeleton  height={25} width="90" />  
                                <Skeleton  height={25} width="90" />  
                                <Skeleton  height={25} width="90" />  
                                <Skeleton  height={25} width="90" />  
                                <Skeleton  height={25} width="90" />  
                                <Skeleton  height={25} width="90" />  
                              </CardContent>
                          </Card>
                        
                   </>
           )
        return (
            <>
            <CardActionArea onClick={this.handleOpenClick}>
            <CardMedia
                  image={posterImages}
                  title={this.props.originalTitle}
                  className="posterImage"
                  />
                  <CardContent>
                      <Typography variant="body1" >
                          {this.props.originalTitle}
                      </Typography>
                     
                  </CardContent>
                </CardActionArea>

                <Dialog fullScreen onClose={this.handleClose} open={this.state.open}>
                   
                    {
                        infoMarkup
                    }
                
                </Dialog>
            </>
        )
    }
}
getUpcoming.propTypes  = {
    getMovieInfo: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    externalApi: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
    UI:state.UI,
    externalApi:state.externalApi,
    user:state.user
})
export default connect(mapStateToProps , { getMovieInfo } ) (getUpcoming)
