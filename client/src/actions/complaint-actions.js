import axios from "axios";
import {
  POST_COMPLAINT_STARTED,
  POST_COMPLAINT_SUCCESS,
  POST_COMPLAINT_FAILED,
  GET_COMPLAINT_STARTED,
  GET_COMPLAINT_SUCCESS,
  GET_COMPLAINT_FAILED,
  GET_YOUR_COMPLAINT_STARTED,
  GET_YOUR_COMPLAINT_SUCCESS,
  GET_YOUR_COMPLAINT_FAILED,
  CHANGE_RESOLVE_STATUS_STARTED,
  CHANGE_RESOLVE_STATUS_SUCCESS,
  CHANGE_RESOLVE_STATUS_FAILED,
  GET_ADMIN_COMPLAINT_FAILED,
  GET_ADMIN_COMPLAINT_SUCCESS,
  GET_ADMIN_COMPLAINT_STARTED,
  NO_MORE_ADMIN_COMPLAINTS,
  NO_MORE_YOUR_COMPLAINTS
} from "./action-types";

axios.defaults.withCredentials = true;

const postComplaintStarted = () => ({
  type: POST_COMPLAINT_STARTED
});

const postComplaintSuccess = complaint => ({
  type: POST_COMPLAINT_SUCCESS,
  complaint
});

const postComplaintFailed = () => ({
  type: POST_COMPLAINT_FAILED
});

export const postComplaint = (complaint, image) => dispatch => {
  dispatch(postComplaintStarted());
  return axios
    .post(`http://localhost:3000/complaint`, { complaint })
    .then(response => {
      let id = response.data._id;
      if (image) {
        axios
          .post(`http://localhost:3000/complaint/${id}/upload`, image)
          .then(res => {
            let complaint = res.data;
            dispatch(postComplaintSuccess(complaint));
          })
          .catch(err => {
            dispatch(postComplaintFailed());
          });
      } else {
        let complaint = response.data;
        dispatch(postComplaintSuccess(complaint));
      }
    })
    .catch(err => {});
};

const getYourComplaintStarted = () => ({ type: GET_YOUR_COMPLAINT_STARTED });

const getYourComplaintSuccess = data => ({
  type: GET_YOUR_COMPLAINT_SUCCESS,
  data
});

const getYourComplaintFailed = () => ({
  type: GET_YOUR_COMPLAINT_FAILED
});

const noMoreYourComplaintsToFetch = () => ({
  type: NO_MORE_YOUR_COMPLAINTS
});

export const getYourComplaints = (skip, limit) => dispatch => {
  dispatch(getYourComplaintStarted());
  return axios
    .get(`http://localhost:3000/complaint/your-complaint/${skip}/${limit}`)
    .then(response => {
      if (response.data.complaints.length)
        dispatch(getYourComplaintSuccess(response.data));
      else dispatch(noMoreYourComplaintsToFetch());
    })

    .catch(err => {
      dispatch(getYourComplaintFailed());
    });
};

const getComplaintStarted = () => ({ type: GET_COMPLAINT_STARTED });

const getComplaintSuccess = complaints => ({
  type: GET_COMPLAINT_SUCCESS,
  complaints
});

const getComplaintFailed = () => ({
  type: GET_COMPLAINT_FAILED
});

export const getComplaints = () => dispatch => {
  dispatch(getComplaintStarted());
  return axios
    .get(`http://localhost:3000/complaint`)
    .then(response => {
      dispatch(getComplaintSuccess(response.data));
    })

    .catch(err => {
      dispatch(getComplaintFailed());
    });
};

const getAdminComplaintStarted = () => ({ type: GET_ADMIN_COMPLAINT_STARTED });

const getAdminComplaintSuccess = data => ({
  type: GET_ADMIN_COMPLAINT_SUCCESS,
  data
});

const getAdminComplaintFailed = () => ({
  type: GET_ADMIN_COMPLAINT_FAILED
});

const noMoreAdminComplaintToFetch = () => ({
  type: NO_MORE_ADMIN_COMPLAINTS
});

export const getAdminComplaints = (skip, limit) => dispatch => {
  dispatch(getAdminComplaintStarted());
  return axios
    .get(`http://localhost:3000/complaint/admin-complaint/${skip}/${limit}`)
    .then(response => {
      if (response.data.complaints.length)
        dispatch(getAdminComplaintSuccess(response.data));
      else {
        dispatch(noMoreAdminComplaintToFetch());
      }
    })

    .catch(err => {
      dispatch(getAdminComplaintFailed());
    });
};

const changeResolveStatusStarted = () => ({
  type: CHANGE_RESOLVE_STATUS_STARTED
});

const changeResolveStatusSuccess = complaint => ({
  type: CHANGE_RESOLVE_STATUS_SUCCESS,
  complaint
});

const changeResolveStatusFailed = () => ({
  type: CHANGE_RESOLVE_STATUS_FAILED
});

export const changeResolveStatus = (complaintId, status) => dispatch => {
  dispatch(changeResolveStatusStarted());
  return axios
    .put(`http://localhost:3000/complaint/${complaintId}/resolve/${status}`)
    .then(response => {
      dispatch(changeResolveStatusSuccess(response.data));
    })

    .catch(err => {
      dispatch(changeResolveStatusFailed());
    });
};
