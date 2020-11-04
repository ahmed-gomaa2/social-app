import {combineReducers} from "redux";
import userReducer from "./userReducer";
import fetchAllPostsReducer from "./fetchAllPostsReducer";

export default combineReducers({
    user: userReducer,
    posts: fetchAllPostsReducer
})