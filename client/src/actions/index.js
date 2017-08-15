export const SET_POSTS = 'GET_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'

export const SET_CATEGORIES = 'SET_CATEGORIES';

export function setPosts({posts}) {
  return {type: SET_POSTS, posts};
}

export function setCategories({categories}) {
  return {type: SET_CATEGORIES, categories};
}

export function upvotePost({post_id}) {
  return {type: UPVOTE_POST, post_id};
}

export function downvotePost({post_id}) {
  return {type: DOWNVOTE_POST, post_id};
}
