import {
  POST_BUZZ_STARTED,
  POST_BUZZ_SUCCESS,
  DELETE_BUZZ_STARTED,
  NO_MORE_BUZZ,
  DELETE_BUZZ_SUCCESS,
  GET_BUZZ_STARTED,
  GET_BUZZ_SUCCESS,
  REACT_BUZZ_STARTED,
  REACT_BUZZ_SUCCESS,
  REACT_BUZZ_FAILED,
  UNREACT_BUZZ_STARTED,
  UNREACT_BUZZ_SUCCESS,
  UNREACT_BUZZ_FAILED,
  GET_BUZZ_FAILED,
  POST_BUZZ_FAILED,
  DELETE_BUZZ_FAILED,
  COMMENT_BUZZ_FAILED,
  COMMENT_BUZZ_STARTED,
  COMMENT_BUZZ_SUCCESS,
  DELETE_COMMENT_FAILED,
  DELETE_COMMENT_STARTED,
  DELETE_COMMENT_SUCCESS,
  DELETE_BUZZ_FROM_STORE
} from "../actions/action-types";

const buzzState = {
  buzzs: [],
  loadingWhilePosting: false,
  loadingWhileGetting: false,
  loadingWhileDeleting: false,
  allBuzzFetched: false
};

//buzz reducer

const buzzReducer = (state = buzzState, action) => {
  switch (action.type) {
    case GET_BUZZ_STARTED: {
      return { ...state, loadingWhileGetting: true };
    }

    case GET_BUZZ_SUCCESS: {
      const buzzs = [...state.buzzs, ...action.buzzs];
      return {
        ...state,
        buzzs,
        loadingWhileGetting: false
      };
    }

    case GET_BUZZ_FAILED: {
      return { ...state, loadingWhileGetting: false };
    }

    case NO_MORE_BUZZ: {
      return { ...state, loadingWhileGetting: false, allBuzzFetched: true };
    }

    case POST_BUZZ_STARTED: {
      return { ...state, loadingWhilePosting: true };
    }

    case POST_BUZZ_SUCCESS: {
      const buzzs = [action.buzz, ...state.buzzs];

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

      return {
        ...state,
        buzzs
      };
    }

    case REACT_BUZZ_FAILED: {
      return { ...state };
    }

    case UNREACT_BUZZ_STARTED: {
      return { ...state };
    }

    case UNREACT_BUZZ_SUCCESS: {
      const index = state.buzzs.findIndex(buzz => buzz._id === action.buzz._id);
      const buzzs = [...state.buzzs];
      buzzs[index] = action.buzz;

      return {
        ...state,
        buzzs
      };
    }

    case UNREACT_BUZZ_FAILED: {
      return { ...state };
    }

    case COMMENT_BUZZ_STARTED: {
      return { ...state };
    }

    case COMMENT_BUZZ_SUCCESS: {
      const index = state.buzzs.findIndex(buzz => buzz._id === action.buzz._id);
      const buzzs = [...state.buzzs];
      buzzs[index] = action.buzz;

      return {
        ...state,
        buzzs
      };
    }

    case COMMENT_BUZZ_FAILED: {
      return { ...state };
    }

    case DELETE_COMMENT_STARTED: {
      return { ...state };
    }

    case DELETE_COMMENT_SUCCESS: {
      const index = state.buzzs.findIndex(buzz => buzz._id === action.buzz._id);

      const buzzs = [...state.buzzs];
      buzzs[index] = action.buzz;

      return {
        ...state,
        buzzs
      };
    }

    case DELETE_COMMENT_FAILED: {
      return { ...state };
    }

    case DELETE_BUZZ_FROM_STORE: {
      return {
        ...buzzState
      };
    }

    default: {
      return state;
    }
  }
};

export default buzzReducer;
