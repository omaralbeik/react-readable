import { combineReducers } from 'redux'
import {objectFromArray} from '../utils/helpers'

import {
  LOAD_POSTS,
  UPVOTE_POST,
  DOWNVOTE_POST,
  LOAD_CATEGORIES} from '../actions'

function posts(state = {}, action) {
  const {posts, post_id} = action;

  switch (action.type) {
    case LOAD_POSTS:
      return objectFromArray(posts, 'id');
    case UPVOTE_POST:
      return {
        ...state,
        [post_id]: {
          ...state[post_id],
          'voteScore': state[post_id]['voteScore'] + 1
        }
      };
    case DOWNVOTE_POST:
    return {
      ...state,
      [post_id]: {
        ...state[post_id],
        'voteScore': state[post_id]['voteScore'] - 1
      }
    };
    default:
      return state;
  }
}

function categories(state = {}, action) {
  const {categories} = action;
  
  switch (action.type) {
    case LOAD_CATEGORIES:
      return objectFromArray(categories, 'name');
    default:
      return state;
  }
}

export default combineReducers({posts, categories});
