import React, { Component } from 'react';
import MyButtons from "../utility/myButtons";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeTimeline, unlikeTimeline } from '../redux/actions/dataActions';
import UIfx from "uifx";
import likePop from './ClickSound/likeSound.mp3';


const pop = new UIfx(likePop)

export class likeButton extends Component {
  state={
    likeIconClicked:false
  }
    likedTimeline = () =>{
        if(
            this.props.user.likes && 
           this.props.user.likes.find(
               (like) => like.timelineId === this.props.timelineId))
        return true;
        else return false;
      };
      
      likeTimeline = () =>{
        this.props.likeTimeline (this.props.timelineId);
        this.setState({
          likeIconClicked:true
        })
        pop.play()
      }
      unlikeTimeline = () =>{
        this.props.unlikeTimeline (this.props.timelineId);
        pop.play()
        this.setState({
          likeIconClicked:false
        })
      }
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
             <Link to="/login">
            <MyButtons tip="Like">
             
             <FavoriteBorderIcon/>
            
            </MyButtons>
            </Link>
          ) : 
            this.likedTimeline() || this.state.likeIconClicked ?  (
              <MyButtons tip="unlike" onClick={this.unlikeTimeline}>
                <FavoriteIcon/>
              </MyButtons>
            ) : (
              <MyButtons tip="like" onClick={this.likeTimeline}>
                <FavoriteBorderIcon/>
              </MyButtons>
            );
            return likeButton;
          
        
    }
}
likeButton.propTypes ={
    user: PropTypes.object.isRequired,
    likeTimeline: PropTypes.func.isRequired,
    unlikeTimeline: PropTypes.func.isRequired,
    timelineId: PropTypes.string.isRequired
  };

  const mapStateToProps = (state) => ({
    user: state.user
  });



  export default connect(
    mapStateToProps,
    { likeTimeline, unlikeTimeline}
  )(likeButton);
