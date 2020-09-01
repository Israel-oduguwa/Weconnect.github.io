import {
    SET_TIMELINES,
    LIKE_TIMELINE,
    UNLIKE_TIMELINE,
    LOADING_DATA,
    DELETE_TIMELINE,
    POST_TIMELINE,
    SET_TIMELINE,
    SUBMIT_COMMENT,
    POST_IMAGE
  } from '../types';
  
  const initialState = {  
      timelines:[],
      postImage:[],
      timeline:{},
      loading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_TIMELINES:
        return {
          ...state,
          timelines: action.payload,
          loading: false
        };
      case SET_TIMELINE:
        return {
          ...state,
          timeline: action.payload
        };
      case POST_IMAGE:
        return {
          ...state,
          postImage: action.payload
        };
        case LIKE_TIMELINE:
        case UNLIKE_TIMELINE:
          let index = state.timelines.findIndex(
            (timeline) => timeline.timelineId === action.payload.timelineId
          );
          state.timelines[index] = action.payload;
          if (state.timeline.timelineId === action.payload.timelineId) {
            let temp = state.timeline.comments;
            state.timeline = action.payload;
            state.timeline.comments = temp
          }
      return {
        ...state
      };
    case DELETE_TIMELINE:
      return {
        ...state,
        timelines: state.timelines.filter((timeline) => timeline.timelineId !== action.payload )
   };
    case POST_TIMELINE:
      return {
        ...state,
        timelines: [action.payload, 
          ...state.timelines]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        timeline: {
          ...state.timeline,
          comments: [action.payload, ...state.timeline.comments],
          commentCount:state.timeline.commentCount+1
        }
      };
    default:
      return state;
  }
}