import { FETCH_USER_SUCCESS, FETCH_USER_FAILED } from "../actions/action-types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS: {
      return action.user;
    }

    case FETCH_USER_FAILED: {
      return action.user;
    }

    default: {
      return state;
    }
  }
};
export default userReducer;
