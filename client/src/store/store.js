import { createStore, applyMiddleware } from "redux";
import buzz from "../reducer/buzz-reducer";
import complaint from "../reducer/complaint-reducer";
import user from "../reducer/user-reducer";
import resolve from "../reducer/resolve-reducer";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({
  buzz,
  user,
  complaint,
  resolve
});
export const store = createStore(reducers, applyMiddleware(thunk));
