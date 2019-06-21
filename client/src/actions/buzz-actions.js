export const postBuzz = data => ({ type: "POST_BUZZ", data });
export const updateBuzz = (data, id) => ({ type: "UPDATE_BUZZ", data, id });
export const deleteBuzz = id => ({ type: "DELETE_BUZZ", id });
export const getBuzz = skip => ({ type: "GET_BUZZ", skip });
export const commentBuzz = (data, id) => ({ type: "COMMENT_BUZZ", id });
export const updateComment = (data, buzzId, comId) => ({
  type: "UPDATE_COMMENT",
  buzzId,
  comId
});
export const reactBuzz = (reaction, id) => ({
  type: "REACT_BUZZ",
  reaction,
  id
});
