import React, { Component } from 'react'
import { getDiscoveredMovies, getUpcomingMovies, searchMovie, getLatestMovies, getTopRated } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import DiscoveredMovies from "../components/Movies/DiscoveredMovies";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import LatestMovies from "../components/Movies/latestMovies"
import Grid from "@material-ui/core/Grid";
import UpComingMovies from "../components/Movies/upComingMovies";
import TopRatedMovies from "../components/Movies/topRatedMovies"
import MovieSkeleton from "../components/MovieSkeleton";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchIcon from '@material-ui/icons/Search';
import LeftButtons from '../components/leftAction/leftButtons';
import { Helmet } from "react-helmet";
const styles = (theme) => ({
    search:{
        borderRadius:"7px",
        marginLeft:0,
        width:"50%",
        position:"relative",
        display:"flex",
       


    },
    searchBar:{
        background:'rgb(214, 212, 212)',
        position:"inherit"
      

    },
    searchIcon:{
        height:"100%",
        alignItems:"center",
        justifyContent:"center"
        
    },
    progress:{
        textAlign:'center',
        marginTop:60,
        marginBottom:50
    }

})

 class Movie extends Component {
    state ={
        body:"",
        direct:false
    }
    componentDidMount() {
        this.props.getUpcomingMovies();
        this.props.getDiscoveredMovies();
        this.props.getLatestMovies();
        this.props.getTopRated()

       
    }
    
    handleSearch = () =>{
        
        this.props.searchMovie (this.state.body);
        this.setState({
            direct:true
        })
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
      
        const { classes } =this.props
        const { results } = this.props.externalApi.movies;
        const { loading  }= this.props.externalApi
        const movieMarkup = results && !loading ? (
           results.map((result) => <DiscoveredMovies key={result.id} result={result} />)
        ):(

            <MovieSkeleton/>
        )
        const { upcomingMovies } = this.props.externalApi
         const UpcomingMarkup = upcomingMovies.results ? (
            upcomingMovies.results.map((result) => <UpComingMovies key={result.id} result={result} /> )
         ):(
            <MovieSkeleton/>
         )
        const { latestMovies } = this.props.externalApi
         const latestMarkup = latestMovies.results ? (
           latestMovies.results.map((result) => <LatestMovies key={result.id} result={result} /> )
         ):(
            <MovieSkeleton/>
         )
        const { topRatedMovies } = this.props.externalApi
         const TopMarkup = topRatedMovies.results ? (
           topRatedMovies.results.map((result) => <TopRatedMovies key={result.id} result={result} /> )
         ):(
            <MovieSkeleton/>
         )
         
        return (
            <>
          {
              this.props.user.authenticated ?
              <>
              <Helmet>
              <title> Movies | WeFriend</title>
            </Helmet>
                    <Grid   container spacing={1}>
                        <Grid className="extras-grid" item md={2}>
                           <LeftButtons/>
                        </Grid>
                    <Grid  item xs={12} item md={10}>      
                    <AppBar className={classes.searchBar}>
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <IconButton 
                                onClick={this.handleSearch}>
                                    <SearchIcon/>
                                </IconButton>
        
                            </div>
                            <InputBase 
                            placeholder="Search movies..."
                            type="text"
                            classes={{
                                root:classes.inputRoot,
                                input:classes.InputInput,
                            }}
                            onChange={this.handleChange}
                            name="body"
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <br/>
                   {
                       results ? 
                        <div className="discovered">
                       <h2 className="upper-scema">Fan Favorites </h2>
                       
                       <div className="discovered-container">
                       <p className="discoverInfo">
                           This week's top movies
                       </p>
                           <ul className="dicoverList">
                           {
                               movieMarkup
                           }
                           </ul>
                       </div>
                   </div>
                   :
                   <MovieSkeleton/>
                   }
                   {
                       upcomingMovies.results ?
                       <div className="discovered">
                       <h2 className="upper-scema" >Upcoming Movies</h2>
                       <div className="discovered-container">
                           <ul className="dicoverList">
                           {
                              UpcomingMarkup
                           }
                           </ul>
                       </div>
                   </div>:
                  <MovieSkeleton/>
                   }
                    {
                        latestMovies.results ?
                        <div className="discovered">
                       <h2  className="upper-scema" >Featured Movies</h2>
                       <div className="discovered-container">
                           <ul className="dicoverList">
                           {
                              latestMarkup
                           }
                           </ul>
                       </div>
                   </div>:
                   <p></p>
                    }
                   {
                       topRatedMovies.results ?
                       <div className="discovered">
                       <h2 className="upper-scema" >Top ratedMovies</h2>
                       <div className="discovered-container">
                           <ul className="dicoverList">
                           {
                              TopMarkup
                           }
                           </ul>
                       </div>
                   </div>:
                 <MovieSkeleton/>
                   }
                    </Grid >
                   
                  </Grid>
                  <>
                  {
                     this.state.direct && 
                      <Redirect to={{
                        pathname:`search/${this.state.body}`,
                        Query:this.state.body
                       
                      }} />
        
                  }
                  </>
                  </> : 
          <Redirect to ="/login" /> 
          } 
          </>
        )
    }
}

Movie.propTypes  = {
    getDiscoveredMovies: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    externalApi: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    
}

const mapStateToProps = state =>({
    UI:state.UI,
    externalApi:state.externalApi,
    user:state.user
})

export default connect(mapStateToProps , {getDiscoveredMovies,getTopRated, searchMovie, getUpcomingMovies, getLatestMovies } )(withStyles(styles)(Movie))
