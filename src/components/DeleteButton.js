import React, { Component } from 'react';
import MyButtons from "../utility/myButtons";
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
// Icons
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

// REdux
import { connect } from 'react-redux';
import { deleteTimeline } from  '../redux/actions/dataActions';
import axios from "axios";

class DeleteButton extends Component {
    state ={
        open:false,
        bollPant:'',
        snack:false
    }
    handleOpen = () =>{
        this.setState({
            open:true
        })
    }
    handleClose = () =>{
        this.setState({
            open:false
        })
    }
    handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            snack:false
        })
    }

    deleteTimeline = () =>{
        this.props.deleteTimeline (this.props.timelineId)
        this.setState({
            snack:true
        })
        if(this.props.videoImage !=="" && this.props.videoName){
            axios.delete(`imageDelete/${this.props.videoName}/delete`)
            .then((res) =>{
                console.log("video")
            })
            .catch((err) =>{
                console.log(err)
            })
        }else if (this.props.imageName !=="" && this.props.imageName){
            axios.delete(`imageDelete/${this.props.imageName}/delete`)
            .then((res) =>{
                console.log("imsge")
            })
            .catch((err) =>{
                console.log(err)
            }) 
        }
        else{
           this.setState({ bollPant:"Not=hing"})
        }
        this.setState({
            open:false
            
        })
    }
    render() {
        return (
           <>
               <MyButtons tip="Delete Timeline" onClick={this.handleOpen}>
                   <DeleteOutlineIcon/>
               </MyButtons>

               <Dialog
               open={this.state.open}
               onClose ={this.handleClose}
               fullWidth
               maxWidth="sm"
               >
                   <DialogTitle>Are you sure you want to delete this post</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.deleteTimeline}>
                            Delete
                        </Button>
                    </DialogActions>

               </Dialog>
               <Snackbar
              
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.snack}
        autoHideDuration={3000}
        onClose={this.handleCloseSnack}
        message="Post deleted Successfully"
      />
           </>
        )
    }
}

DeleteButton.propTypes ={
    deleteTimeline:PropTypes.func.isRequired,
    timelineId: PropTypes.string.isRequired
  };

  export default connect(
    null,
   {deleteTimeline}
  )(DeleteButton);
