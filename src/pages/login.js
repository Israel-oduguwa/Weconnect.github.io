import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import logo from "../images/login.png";
//Mui stuff 
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FilledInput from '@material-ui/core/FilledInput';
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
//Redux implement
import { connect } from 'react-redux';
import { loginUser } from "../redux/actions/userActions";
const styles = {
 form:{
     textAlign :'center'
 },
 pageTitle :{
     margin:'10px auto 10px auto'
 },
 TextField: {
     margin:'10 auto 10px auto'
 },
 button:{
     marginTop:20
 },
 customError:{
     color:"red",
     fontSize:"0.8rem",
     marginTop:"2vh"
 },
 progress:{
     position:'absolute'
 }
 
};

 class login extends Component {
    constructor(){
        super()
        this.state ={
            email:'',
            password:'',
            showPassword:false,
            errors:{
            }
        }
    }
    componentWillReceiveProps(nextProps){
       if(nextProps.UI.errors) {
        this.setState({ errors:nextProps.UI.errors});
       }
    }
    handleClickShowPassword = () => {
       if(this.state.showPassword === false){
           this.setState({
               showPassword:true
           })
       }else{
           this.setState({
               showPassword:false
           })
       }
      };
    
    handleSubmit = (e) =>{
        e.preventDefault();
        const userData = {
           
            email:this.state.email,
            password:this.state.password
        }
       this.props.loginUser(userData, this.props.history);
    };
handleChange = (e) =>{
    this.setState({
        [e.target.name]:e.target.value
    })
}

    render() {
        const { classes, 
            UI:{ loading }
            } = this.props;
        const { errors } = this.state
        return (
           <Grid container className={classes.form}>
                <Helmet>
     <title> WeConnect - Login</title>
     <meta
      name="description"
      content="Login to WeConnect using email and password if  you are a new user, Signup"
    />    
     <meta property="og:title" content="WeConnect - Login"/>
    <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/5914-min-min-min__1598986408_197.210.47.154.jpg?alt=media&token=d8360dc3-1267-4720-9572-99fb9cd4c31d"/>
    <meta property ="og:description" content ="Login to WeConnect using email and password if  you are a new user, Signup"/>
    <meta property="og:type" content="website"/>
    <meta property="twitter:title" content="WeConnect - Login"/>
    <meta property = "twitter:description" content="Login to WeConnect using email and password if  you are a new user, Signup"/>
    <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/5914-min-min-min__1598986408_197.210.47.154.jpg?alt=media&token=d8360dc3-1267-4720-9572-99fb9cd4c31d"/>
    <meta property="twitter:card" content="summary_large_image"/>
   </Helmet>
               <Grid item sm />
               <Grid item sm >
               <div className="logo">
            <img src={logo} alt="logo" className="signLoginLogo"/>
          </div>
                   <Typography variant="h6"  className={classes.pageTitle}>
                       Login
                   </Typography>
                   <form noValidate onSubmit={this.handleSubmit}>                     
                       <TextField id="email" name="email"
                         helperText={errors.email}
                         variant="filled"
                         error={errors.email ? true :false}  type="email" label="Email" className={classes.TextField}
                       value={this.state.email} onChange={this.handleChange} fullWidth/>
                       
                       <FilledInput id="password" name="password"
                       
                         helperText={errors.password}
                         variant="filled"
                         error={errors.password ? true :false}   label="password" className={classes.TextField}
                       value={this.state.password} onChange={this.handleChange} fullWidth 
                       type={this.state.showPassword ? 'text' : 'password'}
                       endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            
                            edge="end"
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                       />
                       {
                           errors.general && (
                               <Typography variant="body2" className={classes.customError}>
                                   {errors.general}
                               </Typography>
                           )
                       }
                        <Button type='submit'
                        variant="contained" color="primary" 
                        disabled={loading} className={classes.button}>
                            Login
                         {loading && (
                             <CircularProgress size={30} className={classes.progress} />
                         )}
                        </Button>
                        <br/>
                        <small>don't have an account ? sign up <Link to="/signup"><span style={{color:"#1a32da"}}>here</span></Link> </small>
                   </form>
               </Grid>
               <Grid item sm />
           </Grid>
        )
    }
}

    login.propTypes ={
        classes: PropTypes.object.isRequired,
        loginUser:PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        UI: PropTypes.object.isRequired
    };
const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
});
const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
