export const SET_POSTS = 'GET_POSTS';


export function setPosts({ posts }) {
  return {
    type: SET_POSTS,
    posts
  }
}
