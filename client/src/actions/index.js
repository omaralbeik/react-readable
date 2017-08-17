export const LOAD_POSTS = 'LOAD_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'

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


export function loadCategories({categories}) {
  return {type: LOAD_CATEGORIES, categories};
}
