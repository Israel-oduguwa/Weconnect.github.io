import React, { Component  } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import InputAdornment from '@material-ui/core/InputAdornment';

import SendIcon from '@material-ui/icons/Send';

import FilledInput from '@material-ui/core/FilledInput';

import { submitComment} from "../../redux/actions/dataActions";
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) =>({
   inputField: {
    backgroundColor:"rgba(0, 0, 0, 0.2)",
    borderRadius:"10px",
    
   }
})
export class CommentForm extends Component {
    state = {
        body:'',
        error:{}
    };
  
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit =(e) =>{
        e.preventDefault()
        this.props.submitComment (this.props.timelineId, { body: this.state.body });
        this.setState({           
            body:""
        })   
    }
    render() {
        const { classes , authenticated } =this.props;
    
        const commentFormMarkup = authenticated ? (
            <Grid item xs={12} className={classes.formGrid}>

                <FilledInput id="comment"
                type="text"
                name="body"
                onChange={this.handleChange}
               value={this.state.body}
                endAdornment={
                    <InputAdornment position="end">
                      <>
                      {
                          this.state.body.trim() === "" ?
                          <IconButton 
                          aria-label="send-disabled"
                          edge="end"
                          disabled
                          >                        
                          <SendIcon/>
                          </IconButton>:
                          <IconButton 
                          aria-label="sendComment"
                          edge="end"
                          onClick={this.handleSubmit}
                          >                        
                          <SendIcon/>
                          </IconButton>
                      }
                      </>
                    </InputAdornment>
                }
            fullWidth
                className={classes.inputField}
            />
               
            </Grid>

        ) : null
        return commentFormMarkup
        
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    timelineId: PropTypes.string.isRequired,
    authenticated:PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    UI:state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm))
