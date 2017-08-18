export const LOAD_POSTS = 'LOAD_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'

export const LOAD_COMMENTS = 'LOAD_POST_COMMENTS'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export function loadPosts({posts}) {
  return {type: LOAD_POSTS, posts};
}

export function upvotePost({post_id}) {
  return {type: UPVOTE_POST, post_id};
}

export function downvotePost({post_id}) {
  return {type: DOWNVOTE_POST, post_id};
}


export function loadComments({comments}) {
  return {type: LOAD_COMMENTS, comments};
}

export function upvoteComment({comment_id}) {
  return {type: UPVOTE_COMMENT, comment_id};
}

export function downvoteComment({comment_id}) {
  return {type: DOWNVOTE_COMMENT, comment_id};
}


export function loadCategories({categories}) {
  return {type: LOAD_CATEGORIES, categories};
}
