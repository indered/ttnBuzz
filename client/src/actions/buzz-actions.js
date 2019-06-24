import axios from "axios";
import {
  POST_BUZZ_STARTED,
  POST_BUZZ_SUCCESS,
  POST_BUZZ_FAILED,
  UPDATE_BUZZ_STARTED,
  UPDATE_BUZZ_SUCCESS,
  UPDATE_BUZZ_FAILED,
  UPDATE_COMMENT_STARTED,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILED,
  DELETE_BUZZ_STARTED,
  DELETE_BUZZ_SUCCESS,
  DELETE_BUZZ_FAILED,
  GET_BUZZ_STARTED,
  GET_BUZZ_SUCCESS,
  GET_BUZZ_FAILED,
  COMMENT_BUZZ_STARTED,
  COMMENT_BUZZ_SUCCESS,
  REACT_BUZZ_STARTED,
  REACT_BUZZ_SUCCESS,
  REACT_BUZZ_FAILED,
  UNREACT_BUZZ_STARTED,
  UNREACT_BUZZ_SUCCESS,
  UNREACT_BUZZ_FAILED
} from "./action-types";
axios.defaults.withCredentials = true;

const postBuzzStarted = () => ({
  type: POST_BUZZ_STARTED
});

const postBuzzSuccess = buzz => ({
  type: POST_BUZZ_SUCCESS,
  buzz
});

const postBuzzFailed = () => ({
  type: POST_BUZZ_FAILED
});

const getBuzzStarted = () => ({ type: GET_BUZZ_STARTED });

const getBuzzSuccess = buzzs => ({
  type: GET_BUZZ_SUCCESS,
  buzzs
});

const getBuzzFailed = () => ({
  type: GET_BUZZ_FAILED
});

export const getBuzz = () => dispatch => {
  dispatch(getBuzzStarted());
  return axios
    .get(`http://localhost:3000/buzz`)
    .then(response => {
      console.log(response.data);
      dispatch(getBuzzSuccess(response.data));
    })

    .catch(err => {
      console.log("get buzz failed with error", err);
      dispatch(getBuzzFailed());
    });
};

const deleteBuzzStarted = () => ({ type: DELETE_BUZZ_STARTED });

const deleteBuzzSuccess = buzzId => ({
  type: DELETE_BUZZ_SUCCESS,
  buzzId
});

const deleteBuzzFailed = () => ({
  type: DELETE_BUZZ_FAILED
});

export const deleteBuzz = buzzId => dispatch => {
  console.log(buzzId);
  dispatch(deleteBuzzStarted());
  return axios
    .delete(`http://localhost:3000/buzz/${buzzId}`)
    .then(response => {
      console.log(response.data);
      dispatch(deleteBuzzSuccess(response.data));
    })

    .catch(err => {
      console.log("get buzz failed with error", err);
      dispatch(deleteBuzzFailed());
    });
};

const reactBuzzStarted = () => ({ type: REACT_BUZZ_STARTED });
const reactBuzzSucess = buzz => ({ type: REACT_BUZZ_SUCCESS, buzz });
const reactBuzzFailed = () => ({ type: REACT_BUZZ_FAILED });

export const reactBuzz = (buzzId, reaction) => dispatch => {
  dispatch(reactBuzzStarted());

  return axios
    .post(`http://localhost:3000/buzz/${buzzId}/react-${reaction}`)
    .then(response => {
      console.log(response.data);
      dispatch(reactBuzzSucess(response.data));
    })

    .catch(err => {
      console.log("react failed with error", err);
      dispatch(reactBuzzFailed());
    });
};

const unreactBuzzStarted = () => ({ type: UNREACT_BUZZ_STARTED });
const unreactBuzzSucess = buzz => ({ type: UNREACT_BUZZ_SUCCESS, buzz });
const unreactBuzzFailed = () => ({ type: UNREACT_BUZZ_FAILED });

export const unreactBuzz = buzzId => dispatch => {
  dispatch(unreactBuzzStarted());

  return axios
    .delete(`http://localhost:3000/buzz/${buzzId}/unreact`)
    .then(response => {
      console.log(response.data);
      dispatch(unreactBuzzSucess(response.data));
    })

    .catch(err => {
      console.log("unreact failed with error", err);
      dispatch(unreactBuzzFailed());
    });
};

export const postBuzz = (buzz, image) => dispatch => {
  dispatch(postBuzzStarted());

  return axios
    .post(`http://localhost:3000/buzz`, { buzz })
    .then(response => {
      let id = response.data._id;
      if (image) {
        axios
          .post(`http://localhost:3000/buzz/${id}/upload`, image)
          .then(res => {
            let buzz = res.data;
            console.log("with image", buzz.picture);
            dispatch(postBuzzSuccess(buzz));
          })
          .catch(err => {
            console.log("post buzz failed wth error", err);
          });
      } else {
        let buzz = response.data;
        console.log("without image", buzz);
        dispatch(postBuzzSuccess(buzz));
      }
    })
    .catch(err => {
      console.log("post buzz failed wth error", err);
    });
};
