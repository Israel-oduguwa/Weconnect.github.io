import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "../images/login.png";
//Mui stuff 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
//rEDUX INPTPTR
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
import FormControl from '@material-ui/core/FormControl';
const styles = (theme)=>({
    form:{
        textAlign :'center'
    },
    logo:{
   
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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
});   

 class signup extends Component {
    constructor(){
        super()
        this.state ={
            email:'',
            password:'',
            fullName:'',
            confirmPassword:'',
            sex:'',
            errors:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors) {
         this.setState({ errors:nextProps.UI.errors});
        }
     }
    handleSubmit = (e) =>{
        e.preventDefault(); 
        const newUserData = {
            fullName:this.state.fullName,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            sex:this.state.sex
        }
        this.props.signupUser(newUserData, this.props.history);
    
    };
handleChange = (e) =>{
    this.setState({
        [e.target.name]:e.target.value
    })
}

    render() {
        const { classes, UI:{ loading } } =this.props;
        const { errors} = this.state
        return (
           <Grid container className ={classes.form}>
                <Helmet>
     <title> WeConnect - sign up</title>
     <meta
      name="description"
      content="Do not have a WeConnect account ? Sign up and get started"
    />    
     <meta property="og:title" content="WeConnect - Sign up"/>
    <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/5914-min-min-min__1598986408_197.210.47.154.jpg?alt=media&token=d8360dc3-1267-4720-9572-99fb9cd4c31d"/>
    <meta property ="og:description" content ="Do not have a WeConnect account ? Sign up and get started"/>
    <meta property="og:type" content="website"/>
    <meta property="twitter:title" content="WeConnect - Signup"/>
    <meta property = "twitter:description" content="Do not have a WeConnect account ? Sign up and get started"/>
    <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/friendme-8be4c.appspot.com/o/5914-min-min-min__1598986408_197.210.47.154.jpg?alt=media&token=d8360dc3-1267-4720-9572-99fb9cd4c31d"/>
    <meta property="twitter:card" content="summary_large_image"/>
   </Helmet>
               <Grid item sm />
               <Grid item sm >
               <div className="logo">
            <img src={logo} alt="logo" className="signLoginLogo"/>
          </div>
                   <Typography variant="h6"  className={classes.pageTitle}>
                       Signup
                   </Typography>
                   <form noValidate onSubmit={this.handleSubmit}>
                       <TextField id="fullName" name="fullName" 
                       type="name" label="fullName"
                       variant="filled"
                        helperText={errors.fullName}
                        error={errors.fullName ? true :false} className={classes.TextField}
                       value={this.state.fullName} onChange={this.handleChange} fullWidth/>

                       <TextField id="email" name="email"
                         helperText={errors.email}
                         variant="filled"
                         error={errors.email ? true :false}  type="email" label="Email" className={classes.TextField}
                       value={this.state.email} onChange={this.handleChange} fullWidth/>
                       
                       <TextField id="password" name="password"
                         helperText={errors.password}
                         variant="filled"
                         error={errors.password ? true :false}  type="password" label="password" className={classes.TextField}
                       value={this.state.password} onChange={this.handleChange} fullWidth/>
                       <TextField id="confirmPassword" name="confirmPassword"
                         helperText={errors.confirmPassword}
                         variant="filled"
                         error={errors.confirmPassword ? true :false}  type="password" label="confirmPassword" className={classes.TextField}
                       value={this.state.confirmPassword} onChange={this.handleChange} fullWidth/>
                          
                          <FormControl variant="filled" className={classes.formControl}>
                         <InputLabel id="Gender">Gender</InputLabel>
                         <Select
                        labelId="Gender"
                        id="gender"  
                        name="sex"
                        value={this.state.sex}
                        onChange={this.handleChange}
                        >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>                      
                        </Select>
                        </FormControl>
                       {
                           errors.general && (
                               <Typography variant="body2" className={classes.customError}>
                                   {errors.general}
                               </Typography>
                           )
                       }
                        <Button type='submit'
                        disabled={loading} variant="contained" color="primary" className={classes.button}>
                           signup
                            {
                                loading && (
                                   <CircularProgress size={30} className={classes.progress}/> 
                                )
                            }
                        </Button>
                        <br/>
                        <small>Already have an account ? login  <Link color="primary" to="/login"><span style={{color:"#1a32da"}}>here</span></Link> </small>
                   </form>
               </Grid>
               <Grid ltem sm />
           </Grid>
        )
    }
}

signup.propTypes ={
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    signupUser:PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})
export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
