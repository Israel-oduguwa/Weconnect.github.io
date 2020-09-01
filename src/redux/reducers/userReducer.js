import { 
    SET_USER, 
    SET_UNAUTHENTICATED, 
    SET_AUTHENTICATED,
    LIKE_TIMELINE,
  UNLIKE_TIMELINE,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
   } from "../types";


const initialState = {
    authenticated: false,
    loading:false,
    credentials: {},
    likes: [],
    notifications:[]
};

export default function (state = initialState, action){
     switch(action.type){
         case SET_AUTHENTICATED:
             return {
                ...state,
                authenticated: true
             };
        case SET_UNAUTHENTICATED:
            return initialState;
         case SET_USER:
            return {
                authenticated: true,
                loading:false,
                ...action.payload
             };
        case LOADING_USER:
            return {
                ...state,
                loading:true}
         case LIKE_TIMELINE:
            return {
            ...state,
            likes: [
            ...state.likes,
                    {
                     fullName: state.credentials.fullName,
                     timelineId: action.payload.timelineId
                        }
                      ]
                    };
                  case UNLIKE_TIMELINE:
                    return {
                      ...state,
                      likes: state.likes.filter(
                        (like) => like.timelineId !== action.payload.timelineId
                      )
                    };
                    case MARK_NOTIFICATIONS_READ:
                    state.notifications.forEach((not) => (not.read = true));
                    return {
                      ...state
                    };
           default:
               return state;
     }
}