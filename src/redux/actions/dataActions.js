import {
    SET_TIMELINES,
    LOADING_DATA,
    LIKE_TIMELINE,
    UNLIKE_TIMELINE,
    DELETE_TIMELINE,
    SET_ERRORS,
    POST_TIMELINE,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_TIMELINE,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    SET_WEATHER,

    LOADING_GETMOVIE,

    FETCH_DISCOVERED,
    GET_MOVIE,
 
    LOADING_API,
    SEARCH_MOVIES,
    GET_LATESTMOVIES,
    GET_TOPRATEDMOVIES,
    GET_UPCOMINGMOVIES,
    POST_IMAGE
  } from '../types';
  import axios from "axios";
const movieKey = process.env.REACT_APP_MOVIE_KEY;
const weatherKey =process.env.REACT_APP_WEATHER_KEY;
  export const getTimelinePost = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/timelinePost')
      .then((res) => {

        dispatch({
          type: SET_TIMELINES,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_TIMELINES,
          payload: []
        });
      });
  };
// Get only one timelines 
 export const getTimeline = (timelineId ) => (dispatch) => {
   dispatch({ type: LOADING_UI});
   axios
   .get(`/postTimeline/${timelineId}`)
   .then((res) =>{
     dispatch({
       type: SET_TIMELINE,
       payload:res.data
     });
     dispatch({ type : STOP_LOADING_UI})
   })
   .catch((err) => console.log(err));
 }
 
  //post Timeline

  export const getCoordsWeather = (lat, long) => (dispatch) => {
    dispatch({ type: LOADING_API});
    axios
    .get(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${weatherKey}`)
    .then((res) =>{
      dispatch({
        type:SET_WEATHER,
        payload:res.data
      })
    })
    .catch((err) => {
      dispatch({
        type:SET_WEATHER,
        payload:[]
      })
    })
  }
  //movies

  export const getDiscoveredMovies = () => (dispatch) => {
    dispatch({ type: LOADING_API});
    axios
    .get(`https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&append_to_response=latest,top_rated,upcoming`)
    .then((res) =>{
      dispatch({
        type: FETCH_DISCOVERED,
        payload:res.data
      })
    })
    .catch((err) => {
      dispatch({
        type:FETCH_DISCOVERED,
        payload:[]
      })
    })
  }
  
  export const getUpcomingMovies = () => (dispatch) => {
    dispatch({ type: LOADING_API });
    axios
    .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${movieKey}&language=en-US&page=2`)
    .then((res) =>{
      dispatch({
        type: GET_UPCOMINGMOVIES,
        payload:res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_UPCOMINGMOVIES,
        payload:[]
      })
    })
  }
  
  export const getLatestMovies = () => (dispatch) => {
    dispatch({ type: LOADING_API});
    axios
    .get(`https://api.themoviedb.org/3/movie/popular?api_key=${movieKey}&language=en-US&page=2`)
    .then((res) =>{
      dispatch({
        type: GET_LATESTMOVIES,
        payload:res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_LATESTMOVIES,
        payload:[]
      })
    })
  }
  export const getTopRated = () => (dispatch) => {
    dispatch({ type: LOADING_API });
    axios
    .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${movieKey}&language=en-US&page=2`)
    .then((res) =>{
      dispatch({
        type: GET_TOPRATEDMOVIES,
        payload:res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_TOPRATEDMOVIES,
        payload:[]
      })
    })
  }
  export const searchMovie = (body) => (dispatch) => {
    dispatch({type: LOADING_API});
    axios
    .get(`https://api.themoviedb.org/3/search/multi?api_key=${movieKey}&language=en-US&query=${body}&page=1&include_adult=false`)
    .then((res) =>{
      dispatch({
        type: SEARCH_MOVIES,
        payload:res.data
      })
    })
    .catch((err) =>{
      dispatch( { 
        type: SEARCH_MOVIES,
        payload:[]
      });

    })
  }
  export const getMovieInfo = (id) => (dispatch) => {
    dispatch({ type: LOADING_GETMOVIE});
    axios
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${movieKey}&language=en-US&append_to_response=videos,images,similar,reviews,credits`)
    .then((res) =>{
      dispatch({
        type: GET_MOVIE,
        payload:res.data
      })
     
    })
   .catch((err) => console.log(err))
  }
//Music



  export const postTimeline = (newTimeline) =>(dispatch) => {
    dispatch({ type: LOADING_UI});
    axios
    .post('/postTimeline', newTimeline)
    .then((res) =>{
     
      dispatch({
        type:POST_TIMELINE,
        payload:res.data
      });
      dispatch({ type: CLEAR_ERRORS })
    })
    .catch((err) =>{
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
  }
  export const postImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_UI})
    axios
    .post('/postTimeline/image', formData)
    .then((res) =>{
      dispatch({
        type:POST_IMAGE,
        payload:res.data
      });
       dispatch({ type: CLEAR_ERRORS })
    })
    .catch((err) =>{
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
  }
// submitComment request
  export const submitComment = (timelineId, commentData) => (dispatch) =>{
    dispatch({ type: LOADING_UI});
    axios
    .post(`/postTimeline/${timelineId}/comment`, commentData)
    .then((res) =>{
      dispatch({
        type:SUBMIT_COMMENT,
        payload:res.data
      });
       dispatch({ type: CLEAR_ERRORS })
    })
    .catch((err) =>{
      dispatch({
        type:SET_ERRORS,
        payload:err.response.data
      })
    })
  }
//code correct
  export const likeTimeline = (timelineId) => (dispatch) => {
    axios
      .get(`/postTimeline/${timelineId}/like`)
      .then((res) => {
        console.log(res)
        dispatch({
          type: LIKE_TIMELINE,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike a scream
  export const unlikeTimeline = (timelineId) => (dispatch) => {
    axios
      .get(`/postTimeline/${timelineId}/unlike`)
      .then((res) => {
          console.log(res.data)
        dispatch({
          type: UNLIKE_TIMELINE,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  export const deleteTimeline = (timelineId) => (dispatch) =>{
    axios
    .delete(`/postTimeline/${timelineId}/delete`)
    .then(() =>{
      dispatch({ type: DELETE_TIMELINE, payload: timelineId })
    })
    .catch((err) => console.log(err))
  }

export const getUserData = (fullName) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get(`/user/${fullName}`)
  .then((res) => {
    dispatch({
      type: SET_TIMELINES,
      payload:res.data.timelines
    });
  })
  .catch((err) =>{
    dispatch({
      type:SET_TIMELINES,
      payload:null
    })
  })
}

  ///postTimeline/:timelineId/like



  