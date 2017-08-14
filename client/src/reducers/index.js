import { SET_POSTS } from '../actions'


export function posts(state=null, action) {

  var posts = [];

  switch (action.type) {
    case SET_POSTS:
      posts = action.posts;
      return posts;
    default:
      return state;
  }

}
