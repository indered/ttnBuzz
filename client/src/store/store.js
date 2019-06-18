import { createStore } from "redux";
import { user, buzz } from "../reducers/reducer";
import { combineReducers } from "redux";
import logger from "../middleware/logger";

const rootReducer = combineReducers({
  buzzs,
  user,
  complaints
});
export const store = createStore(buzzs, user, complaints);
