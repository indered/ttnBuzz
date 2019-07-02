import {
  POST_COMPLAINT_SUCCESS,
  POST_COMPLAINT_STARTED,
  POST_COMPLAINT_FAILED,
  GET_YOUR_COMPLAINT_STARTED,
  GET_YOUR_COMPLAINT_SUCCESS,
  GET_YOUR_COMPLAINT_FAILED,
  NO_MORE_YOUR_COMPLAINTS
} from "../actions/action-types";

const complaintState = {
  complaints: [],
  count: 0,
  loadingWhilePosting: false,
  loadingWhileGetting: false,
  allYourComplaintsFetched: false
};

const complaintReducer = (state = complaintState, action) => {
  switch (action.type) {
    case POST_COMPLAINT_STARTED: {
      return {
        ...state,
        loadingWhilePosting: true
      };
    }

    case POST_COMPLAINT_SUCCESS: {
      const complaints = [action.complaint, ...state.complaints];

      return {
        ...state,
        complaints,
        loadingWhilePosting: false
      };
    }

    case POST_COMPLAINT_FAILED: {
      return {
        ...state,
        loadingWhilePosting: false
      };
    }

    case GET_YOUR_COMPLAINT_STARTED: {
      return {
        ...state,
        loadingWhileGetting: true,
        allYourComplaintsFetched: false
      };
    }

    case GET_YOUR_COMPLAINT_SUCCESS: {
      const complaints = action.data.complaints;

      return {
        ...state,
        complaints,
        loadingWhileGetting: false,
        allYourComplaintsFetched: false,
        count: action.data.count
      };
    }
    case GET_YOUR_COMPLAINT_FAILED: {
      return {
        ...state,
        loadingWhileGetting: false,
        allYourComplaintsFetched: false
      };
    }

    case NO_MORE_YOUR_COMPLAINTS: {
      return { ...state, allYourComplaintsFetched: true };
    }

    default: {
      return state;
    }
  }
};

export default complaintReducer;
