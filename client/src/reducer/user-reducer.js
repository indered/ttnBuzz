import { FETCH_USER_SUCCESS, FETCH_USER_FAILED } from "../actions/action-types";

export const user = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS: {
      console.log(("success user:", action.user));
      return action.user;
    }

    case FETCH_USER_FAILED: {
      console.log("failed user:" + action.user);
      return action.user;
    }

    default: {
      return state;
    }
  }
};
