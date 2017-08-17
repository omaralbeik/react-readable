import { combineReducers } from 'redux'

import {
  LOAD_POSTS,
  UPVOTE_POST,
  DOWNVOTE_POST,
  LOAD_CATEGORIES} from '../actions'

function posts(state = [], action) {
  switch (action.type) {
    case LOAD_POSTS:
      return action.posts;
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

function categories(state = [], action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

export default combineReducers({posts, categories});
