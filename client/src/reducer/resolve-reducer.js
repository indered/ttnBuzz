import {
  CHANGE_RESOLVE_STATUS_FAILED,
  CHANGE_RESOLVE_STATUS_STARTED,
  CHANGE_RESOLVE_STATUS_SUCCESS,
  GET_ADMIN_COMPLAINT_FAILED,
  GET_ADMIN_COMPLAINT_STARTED,
  GET_ADMIN_COMPLAINT_SUCCESS,
  NO_MORE_ADMIN_COMPLAINTS
} from "../actions/action-types";

const resolveState = {
  complaints: [],
  loadingWhilePosting: false,
  loadingWhileGetting: false,
  count: 0,
  allAdminComplaintsFetched: false
};

const resolveReducer = (state = resolveState, action) => {
  switch (action.type) {
    case GET_ADMIN_COMPLAINT_STARTED: {
      return {
        ...state,
        loadingWhileGetting: true,
        allAdminComplaintsFetched: false
      };
    }

    case GET_ADMIN_COMPLAINT_SUCCESS: {
      const complaints = action.data.complaints;
      return {
        ...state,
        complaints,
        count: action.data.count,
        loadingWhileGetting: false,
        allAdminComplaintsFetched: false
      };
    }
    case GET_ADMIN_COMPLAINT_FAILED: {
      return {
        ...state,
        loadingWhileGetting: false,
        allAdminComplaintsFetched: false
      };
    }

    case NO_MORE_ADMIN_COMPLAINTS: {
      return { ...state, allAdminComplaintsFetched: true };
    }

    case CHANGE_RESOLVE_STATUS_STARTED: {
      return {
        ...state,
        loadingWhilePosting: true,
        notify: {
          status: false
        }
      };
    }
    case CHANGE_RESOLVE_STATUS_SUCCESS: {
      const index = state.complaints.findIndex(
        c => c._id === action.complaint._id
      );
      const complaints = [...state.complaints];
      complaints[index] = action.complaint;
      console.log("success", complaints);

      return {
        ...state,
        complaints,
        notify: {
          status: true,
          content: "Complaint status updated!"
        }
      };
    }

    case CHANGE_RESOLVE_STATUS_FAILED: {
      return {
        ...state,
        loadingWhilePosting: false,
        notify: {
          status: true,
          content: "Changing complaint status failed"
        }
      };
    }
    default: {
      return state;
    }
  }
};
export default resolveReducer;
