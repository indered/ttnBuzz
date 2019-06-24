import {
  POST_BUZZ_STARTED,
  POST_BUZZ_SUCCESS,
  UPDATE_BUZZ_STARTED,
  UPDATE_BUZZ_SUCCESS,
  UPDATE_COMMENT_STARTED,
  UPDATE_COMMENT_SUCCESS,
  DELETE_BUZZ_STARTED,
  DELETE_BUZZ_SUCCESS,
  GET_BUZZ_STARTED,
  GET_BUZZ_SUCCESS,
  COMMENT_BUZZ_STARTED,
  COMMENT_BUZZ_SUCCESS,
  REACT_BUZZ_STARTED,
  REACT_BUZZ_SUCCESS,
  REACT_BUZZ_FAILED,
  UNREACT_BUZZ_STARTED,
  UNREACT_BUZZ_SUCCESS,
  UNREACT_BUZZ_FAILED,
  GET_BUZZ_FAILED,
  POST_BUZZ_FAILED,
  DELETE_BUZZ_FAILED
} from "../actions/action-types";

const buzzState = {
  buzzs: [],
  loadingWhilePosting: false,
  loadingWhileGetting: false,
  loadingWhileDeleting: false
};

//buzz reducer

const buzzReducer = (state = buzzState, action) => {
  switch (action.type) {
    case GET_BUZZ_STARTED: {
      return { ...state, loadingWhileGetting: true };
    }

    case GET_BUZZ_SUCCESS: {
      const buzzs = action.buzzs;
      return { ...state, buzzs, loadingWhileGetting: false };
    }

    case GET_BUZZ_FAILED: {
      return { ...state, loadingWhileGetting: false };
    }

    case POST_BUZZ_STARTED: {
      return { ...state, loadingWhilePosting: true };
    }

    case POST_BUZZ_SUCCESS: {
      console.log("reducer suucerss");
      const buzzs = [action.buzz, ...state.buzzs];
      console.log(buzzs);
      return {
        ...state,
        buzzs,
        loadingWhilePosting: false
      };
    }

    case POST_BUZZ_FAILED: {
      return { ...state, loadingWhilePosting: false };
    }

    case DELETE_BUZZ_STARTED: {
      return { ...state, loadingWhileDeleting: true };
    }

    case DELETE_BUZZ_SUCCESS: {
      const buzzs = state.buzzs.filter(buzz => buzz._id !== action.buzzId);
      console.log("delete success", buzzs);
      return {
        ...state,
        buzzs,
        loadingWhileDeleting: false
      };
    }

    case DELETE_BUZZ_FAILED: {
      return {
        ...state,
        loadingWhileDeleting: false
      };
    }

    case REACT_BUZZ_STARTED: {
      return {
        ...state
      };
    }
    case REACT_BUZZ_SUCCESS: {
      const index = state.buzzs.findIndex(buzz => buzz._id === action.buzz._id);
      const buzzs = [...state.buzzs];
      buzzs[index] = action.buzz;
      console.log("success", buzzs);

      return {
        ...state,
        buzzs
      };
    }

    case REACT_BUZZ_FAILED: {
      return { ...state };
    }

    case UNREACT_BUZZ_STARTED: {
      console.log("unreact started");
      return { ...state };
    }

    case UNREACT_BUZZ_SUCCESS: {
      const index = state.buzzs.findIndex(buzz => buzz._id === action.buzz._id);
      const buzzs = [...state.buzzs];
      buzzs[index] = action.buzz;
      console.log("unreact success", buzzs);
      return {
        ...state,
        buzzs
      };
    }

    case UNREACT_BUZZ_FAILED: {
      console.log("unreact failed");
      return { ...state };
    }

    default: {
      return state;
    }
  }
};

export default buzzReducer;
