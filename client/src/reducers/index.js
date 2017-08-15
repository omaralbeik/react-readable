import {
  SET_POSTS,
  UPVOTE_POST,
  DOWNVOTE_POST,
  SET_CATEGORIES
} from '../actions'

export function posts(state = [], action) {

  switch (action.type) {
    case SET_POSTS:
      return action.posts
    case UPVOTE_POST:
      return state.map((p) => {
        if (p.id === action.post_id) {
          p.voteScore += 1
        };
        return p;
      });
    case DOWNVOTE_POST:
      return state.map((p) => {
        if (p.id === action.post_id) {
          p.voteScore -= 1
        };
        return p;
      });
    default:
      return state;
  }

}

export function categories(state = [], action) {

  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }

}
