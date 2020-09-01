import React, { Component } from 'react';
import { BrowserRouter as Router , Route , Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import AuthRoute from "./utility/AuthRoute";
import axios from "axios";
import Profile from "./pages/profile";
//theme
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
//pages
import jwtDecode from "jwt-decode";
import CssBaseline from "@material-ui/core/CssBaseline";
import Login from "./pages/login";
import signup from "./pages/signup";
import home from "./pages/home";
import PhotoGallery from "./pages/PhotoGallery";
import weatherPage from "./pages/weatherPage";

import ErrorPage from "./pages/ErrorPage";

import Movies from "./pages/Movie";
import MovieResults from "./pages/MovieResults";
import Users from "./pages/Users";
import Covid19 from "./pages/Covid19";
//redux
import { Provider } from 'react-redux'; 
import store from "./redux/store";
import { SET_AUTHENTICATED} from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

const darkTheme = createMuiTheme({
  palette: {
   type:"dark"
  },
  typography:{
    userNextVariants:true
  },
  
})

const lightTheme = createMuiTheme({
  palette:{
    background:{
      default:"#f3f3f3",
    }
  },
  primary: {
    main: '#1976d2',
    contrastText:'#f6f7f8',
  textPrimary:"#d81b60"
  },
  secondary: {
    main: '#1e88e5',
  },
  navIcon:{
    main:"black",
  },
  appBar:{
    main:'#fff'
  },
  typography:{
    userNextVariants:true,
   /* color:"#424242",*/
    allVariants: {
      color: "#424242"
    },
  },
})
axios.defaults.baseURL = 'https://europe-west1-friendme-8be4c.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token){
const decodedToken = jwtDecode(token);

if(decodedToken.exp * 1000 < Date.now()){
  store.dispatch(logoutUser())
  window.location.href ='/login';
}

else{
  store.dispatch({ type:SET_AUTHENTICATED});
  axios.defaults.headers.common['Authorization']= token; 
  store.dispatch(getUserData())
  
}
}
export class App extends Component {

   state={
     topLevelDark:false,
    
   }
   handleTheme = () =>{
    if (this.state.topLevelDark === false) {
      this.setState({
        topLevelDark:true
      })
    } else {
      this.setState({
        topLevelDark:false
      })
    }
   }
  render() {
    
    return (
    <MuiThemeProvider theme={ !this.state.topLevelDark ? lightTheme : darkTheme }>    
      <CssBaseline/>
       <Provider store={store}>
       <div className="App" color="background">
       <button  onClick={this.handleTheme}>DarkMode</button>
        <Router>
        <Navbar/>
         <div className="container">          
          <Switch>                  
            <Route exact path="/" component={home}/>
            <AuthRoute exact path="/login" component={Login}   />
            <AuthRoute exact path="/signup" component={signup}  />
            <Route exact path ="/profile" component={Profile}/>
            <Route exact path ="/weather" component={weatherPage}/>
              
            <Route exact path ="/covid19" component={Covid19}/>     
            {/* remmber to add exact  */}
            <Route  path ="/user/:fullName/posts/:timelineId" component={Users}/>
            <Route exact path ="/movies" component={Movies} />
            
            <Route exact path ='/photos' component={PhotoGallery}/>
            <Route path = '/search/:movie' component={MovieResults}/>
            <Route exact path ="/user/:fullName" component={Users} />
            <Route  path = "*" component={ErrorPage} /> 
            
          </Switch>
         </div>
        </Router>
      </div>
       </Provider>
    </MuiThemeProvider>


    )
  }
}

export default App
