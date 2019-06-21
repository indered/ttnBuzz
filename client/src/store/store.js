import { createStore, applyMiddleware } from "redux";
import buzzs from "../reducer/buzz-reducer";
import complaints from "../reducer/complaint-reducer";
import { user } from "../reducer/user-reducer";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({
  buzzs,
  user,
  complaints
});
export const store = createStore(reducers, applyMiddleware(thunk));
