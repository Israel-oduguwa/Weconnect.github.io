import {
  SET_WEATHER,
  FETCH_DISCOVERED,
  GET_MOVIE,
  LOADING_API,
  LOADING_GETMOVIE,
  GET_TOPRATEDMOVIES,
  GET_UPCOMINGMOVIES,
  GET_LATESTMOVIES,
  SEARCH_MOVIES
 
  } from '../types';

  

const initialState ={
    weather:[],
    covid19:[],
    movies:[],
    movieInfo:[],
    latestMovies:[],
    upcomingMovies:[],
    topRatedMovies:[],
    searchMovies:[]

    
}

export default function(state =initialState, action) {
    switch(action.type) {
        case LOADING_API:
            return {
                ...state,
                loading:true
            }; 
            case LOADING_GETMOVIE:
                return {
                    ...state,
                    movieLoading:true
                };
            
        case SET_WEATHER:
            return {
                ...state,
                weather:action.payload,
                loading:false
            };
        
       
        case FETCH_DISCOVERED:
            return{
                ...state,
                movies:action.payload,
                loading:false
            }

        case GET_MOVIE:
            return{
                ...state,
                movieInfo:action.payload,
                movieLoading:false
                
            }
        case  GET_LATESTMOVIES:
            return{
                ...state,
                latestMovies:action.payload,
                loading:false
            }
        case  GET_UPCOMINGMOVIES:
            return{
                ...state,
               upcomingMovies:action.payload,
                loading:false
            }
        case  GET_TOPRATEDMOVIES:
            return{
                ...state,
                topRatedMovies:action.payload,
                loading:false
            }
        case  SEARCH_MOVIES:
            return{
                ...state,
                searchMovies:action.payload,
                loading:false
            }
            default:
                return state;
    }
}