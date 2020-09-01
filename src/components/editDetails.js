import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";
import Tooltip from '@material-ui/core/Tooltip';
//Mui stuuf 
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
const styles =(theme) =>({
    editButton:{
        marginRight: theme.spacing(1),
    }
})
 class editDetails extends Component {
     state ={
         bio:'',
         website:'',
         location:'',
         birthDate:'',
         famousQuotes:'',
         languages:'',
         otherNames:'',
         relationshipStatus:'',
         open: false
     };
     mapUserDetailsToState =(credentials) =>{
        this.setState({
            bio:credentials.bio ? credentials.bio: '',
            website:credentials.website ? credentials.website: '',
            location:credentials.location ? credentials.location: '',
            birthDate:credentials.birthDate ? credentials.birthDate:'',
            languages:credentials.languages ? credentials.languages:'',
            otherNames:credentials.otherNames ? credentials.otherNames:'',
            famousQuotes:credentials.famousQuotes ? credentials.famousQuotes:'',
            relationshipStatus:credentials.relationshipStatus ? credentials.relationshipStatus:''
        });
     }
 handleOpen = () =>{
     this.setState({ open:true })
     this.mapUserDetailsToState(this.props.credentials);
 };
 handleClose = () => {
     this.setState({ open:false })
 };
 componentDidMount(){
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials)
}

 

 handleChange = (e) =>{
    this.setState({
        [e.target.name]: e.target.value
    })
};
handleSubmit =() =>{
    const userDetails = {
        bio: this.state.bio,
        website: this.state.website,
        location: this.state.location,
        birthDate: this.state.birthDate,
        languages: this.state.languages,
        otherNames: this.state.otherNames,
        skills:this.state.skills,
        relationshipStatus:this.state.relationshipStatus,
        famousQuotes:this.state.famousQuotes
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
}
 
   
   
    render() {
        const classes=this.props
        return (
           <Fragment>
            <Tooltip title="Edit details" >
               <Button
       variant="outlined" color="primary"
        size="small"
       
        onClick={this.handleOpen}
        className={classes.editButton}
        startIcon={<EditIcon/>}
        >
        Edit details
        </Button>
            </Tooltip>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth ="sm">
                <DialogTitle>Edit your profile details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                        name="bio"
                        type="text"
                        label="bio"
                        multiline
                        rows="3"
                        placeholder="A short bio about Yourself"
                        value={this.state.bio}
                        onChange={this.handleChange}
                        fullWidth
                        />
                        <TextField
                        name="website"
                        type="text"
                        label="website"
                        multiline
                      
                        placeholder="Personal/professional website"
                        value={this.state.website}
                        onChange={this.handleChange}
                        fullWidth/>
                        <TextField
                        name="location"
                        type="text"
                        label="location"
                        multiline
                        
                        placeholder="Where you live"
                        value={this.state.location}
                        onChange={this.handleChange}
                        fullWidth/>
                         <TextField
                        id="date"
                        label="Birthday"
                        name="birthDate"
                        type="date"
                        defaultValue={this.state.birthDate}
                        onChange={this.handleChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
      />
                        <TextField
                        name="languages"
                        type="text"
                        label="languages"
                        multiline
                        
                        placeholder="Languages"
                        value={this.state.languages}
                        onChange={this.handleChange}
                        fullWidth/>
                        <TextField
                        name="skills"
                        type="text"
                        label="skills"
                        multiline
                        
                        placeholder="Skills"
                        value={this.state.skills}
                        onChange={this.handleChange}
                        fullWidth/>
                        <TextField
                        name="otherNames"
                        type="text"
                        label="otherNames"
                        multiline
                        
                        placeholder="otherNames"
                        value={this.state.otherNames}
                        onChange={this.handleChange}
                        fullWidth/>
                        <TextField
                        name="famousQuotes"
                        type="text"
                        label="bestQuotes"
                        multiline
                        
                        placeholder="bestQuotes"
                        value={this.state.famousQuotes}
                        onChange={this.handleChange}
                        fullWidth/>
                        <InputLabel id="relationship status">Relationship status</InputLabel>
                        <Select
                        labelId="relationship status"
                        id="demo-simple-select"
                        name="relationshipStatus"
                        value={this.state.relationshipStatus}
                        onChange={this.handleChange}
                        >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="In a relationship">In a relationship</MenuItem>
                        <MenuItem value="Engaged">Engaged</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                        <MenuItem value="In a domestic partnership">In a domestic partnership</MenuItem>
                        <MenuItem value="In an open relationship">In an open relationship</MenuItem>
                        <MenuItem value="it's complicated">it's complicated</MenuItem>
                        <MenuItem value="In a civil Union">In a civil Union</MenuItem>
                        <MenuItem value="Separated">Separated</MenuItem>
                        <MenuItem value="Divorced">Divorced</MenuItem>
                        <MenuItem value="Widowed">Widowed</MenuItem>
                        </Select>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
           </Fragment>
        );
    }
}
editDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}
 const mapStateToProps = (state) => ({
     credentials: state.user.credentials
 });

 export default connect(
    mapStateToProps,
    { editUserDetails }
  )(withStyles(styles)(editDetails));
