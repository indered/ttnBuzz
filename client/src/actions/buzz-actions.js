import axios from "axios";
import {
  POST_BUZZ_STARTED,
  POST_BUZZ_SUCCESS,
  POST_BUZZ_FAILED,
  DELETE_BUZZ_STARTED,
  DELETE_BUZZ_SUCCESS,
  DELETE_BUZZ_FAILED,
  GET_BUZZ_STARTED,
  GET_BUZZ_SUCCESS,
  GET_BUZZ_FAILED,
  NO_MORE_BUZZ,
  REACT_BUZZ_STARTED,
  REACT_BUZZ_SUCCESS,
  REACT_BUZZ_FAILED,
  UNREACT_BUZZ_STARTED,
  UNREACT_BUZZ_SUCCESS,
  UNREACT_BUZZ_FAILED,
  COMMENT_BUZZ_STARTED,
  COMMENT_BUZZ_SUCCESS,
  COMMENT_BUZZ_FAILED,
  DELETE_COMMENT_STARTED,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILED,
  DELETE_BUZZ_FROM_STORE
} from "./action-types";
axios.defaults.withCredentials = true;

//get Buzz

const getBuzzStarted = () => ({ type: GET_BUZZ_STARTED });

const getBuzzSuccess = buzzs => ({
  type: GET_BUZZ_SUCCESS,
  buzzs
});

const getBuzzFailed = () => ({
  type: GET_BUZZ_FAILED
});

const noMoreBuzzToFetch = () => ({ type: NO_MORE_BUZZ });

export const getBuzz = (skip, limit) => dispatch => {
  dispatch(getBuzzStarted());
  return axios
    .get(`http://localhost:3000/buzz/${skip}/${limit}`)
    .then(response => {
      if (response.data.length) dispatch(getBuzzSuccess(response.data));
      else dispatch(noMoreBuzzToFetch());
    })

    .catch(err => {
      dispatch(getBuzzFailed());
    });
};

//delete Buzz

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
      dispatch(deleteBuzzSuccess(response.data));
    })

    .catch(err => {
      dispatch(deleteBuzzFailed());
    });
};

//React Buzz

const reactBuzzStarted = () => ({ type: REACT_BUZZ_STARTED });
const reactBuzzSucess = buzz => ({ type: REACT_BUZZ_SUCCESS, buzz });
const reactBuzzFailed = () => ({ type: REACT_BUZZ_FAILED });

export const reactBuzz = (buzzId, reaction) => dispatch => {
  dispatch(reactBuzzStarted());

  return axios
    .post(`http://localhost:3000/buzz/${buzzId}/react-${reaction}`)
    .then(response => {
      dispatch(reactBuzzSucess(response.data));
    })

    .catch(err => {
      dispatch(reactBuzzFailed());
    });
};

//unreact Buzz

const unreactBuzzStarted = () => ({ type: UNREACT_BUZZ_STARTED });
const unreactBuzzSucess = buzz => ({ type: UNREACT_BUZZ_SUCCESS, buzz });
const unreactBuzzFailed = () => ({ type: UNREACT_BUZZ_FAILED });

export const unreactBuzz = buzzId => dispatch => {
  dispatch(unreactBuzzStarted());

  return axios
    .delete(`http://localhost:3000/buzz/${buzzId}/unreact`)
    .then(response => {
      dispatch(unreactBuzzSucess(response.data));
    })

    .catch(err => {
      dispatch(unreactBuzzFailed());
    });
};

//post Buzz

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
            dispatch(postBuzzSuccess(buzz));
          })
          .catch(err => {});
      } else {
        let buzz = response.data;
        dispatch(postBuzzSuccess(buzz));
      }
    })
    .catch(err => {
      dispatch(postBuzzFailed());
    });
};

//comment Buzz

const commentBuzzStarted = () => ({ type: COMMENT_BUZZ_STARTED });
const commentBuzzSuccess = buzz => ({ type: COMMENT_BUZZ_SUCCESS, buzz });
const commentBuzzFailed = () => ({ type: COMMENT_BUZZ_FAILED });

export const commentBuzz = (buzzId, comment) => dispatch => {
  dispatch(commentBuzzStarted());

  return axios
    .post(`http://localhost:3000/buzz/${buzzId}/comments`, { comment })
    .then(response => {
      console.log(response.data);
      dispatch(commentBuzzSuccess(response.data));
    })

    .catch(err => {
      dispatch(commentBuzzFailed());
    });
};

const deleteCommentStarted = () => ({
  type: DELETE_COMMENT_STARTED
});
const deleteCommentSuccess = buzz => ({
  type: DELETE_COMMENT_SUCCESS,
  buzz
});

const deleteCommentFailed = () => ({
  type: DELETE_COMMENT_FAILED
});

export const deleteComment = (buzzId, commentId) => dispatch => {
  dispatch(deleteCommentStarted());

  return axios
    .delete(`http://localhost:3000/buzz/${buzzId}/comments/${commentId}`)
    .then(response => {
      dispatch(deleteCommentSuccess(response.data));
    })

    .catch(err => {
      dispatch(deleteCommentFailed());
    });
};

export const deleteBuzzFromStrore = () => ({
  type: DELETE_BUZZ_FROM_STORE
});
