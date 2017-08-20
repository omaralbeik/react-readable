export const LOAD_POSTS = 'LOAD_POSTS';
export const ADD_POST = 'ADD_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const SET_SORTING_PREFERENCE_BY_DATE = 'SET_SORTING_PREFERENCE_BY_DATE';
export const SET_SORTING_PREFERENCE_BY_SCORE = 'SET_SORTING_PREFERENCE_BY_SCORE';

/****************************************************************************/
/*                          Posts action creators                           */
/****************************************************************************/

export function loadPosts({posts}) {
  return {type: LOAD_POSTS, posts};
}

export function addPost({post}) {
  return {type: ADD_POST, post};
}

export function upvotePost({post_id}) {
  return {type: UPVOTE_POST, post_id};
}

export function downvotePost({post_id}) {
  return {type: DOWNVOTE_POST, post_id};
}

export function editPost({post}) {
  return {type: EDIT_POST, post};
}

export function deletePost({post_id}) {
  return {type: DELETE_POST, post_id};
}

export function loadComments({comments}) {
  return {type: LOAD_COMMENTS, comments};
}


/****************************************************************************/
/*                        Comments action creators                          */
/****************************************************************************/

export function addComment({comment}) {
  return {type: ADD_COMMENT, comment};
}

export function upvoteComment({comment_id}) {
  return {type: UPVOTE_COMMENT, comment_id};
}

export function downvoteComment({comment_id}) {
  return {type: DOWNVOTE_COMMENT, comment_id};
}

export function editComment({comment}) {
  return {type: EDIT_COMMENT, comment};
}

export function deleteComment({comment_id}) {
  return {type: DELETE_COMMENT, comment_id};
}


/****************************************************************************/
/*                       Categories action creators                         */
/****************************************************************************/

export function loadCategories({categories}) {
  return {type: LOAD_CATEGORIES, categories};
}


/****************************************************************************/
/*                       Prefrences action creators                         */
/****************************************************************************/

export function setSortingPreferenceByDate() {
  return {type: SET_SORTING_PREFERENCE_BY_DATE};
}

export function setSortingPreferenceByScore() {
  return {type: SET_SORTING_PREFERENCE_BY_SCORE};
}
