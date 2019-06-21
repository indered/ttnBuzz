import axios from "axios";

import { FETCH_USER_FAILED, FETCH_USER_SUCCESS } from "./action-types";
axios.defaults.withCredentials = true;

const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  user
});
const fetchUserFailed = () => ({
  type: FETCH_USER_FAILED,
  user: false
});

export const userLogout = () => dispatch => {
  return axios.get(`http://localhost:3000/auth/logout`).then(response => {
    if (response.data === "success") {
      dispatch(fetchUserFailed());
    }
  });
};

export const fetchUser = () => dispatch => {
  return axios
    .get(`http://localhost:3000/user`)
    .then(response => {
      dispatch(fetchUserSuccess(response.data));
    })

    .catch(err => {
      dispatch(fetchUserFailed());
    });
};
