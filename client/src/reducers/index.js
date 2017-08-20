import { combineReducers } from 'redux'
import {objectFromArray} from '../utils/helpers'

import {
  // posts actions
  LOAD_POSTS,
  ADD_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  EDIT_POST,
  DELETE_POST,

  // comments actions
  LOAD_COMMENTS,
  ADD_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,

  // categories actions
  LOAD_CATEGORIES,

  // preferences actions
  SET_SORTING_PREFERENCE_BY_DATE,
  SET_SORTING_PREFERENCE_BY_SCORE
} from '../actions'


// Posts reducers
function posts(state = {}, action) {
  const {posts, post_id, post} = action;

  switch (action.type) {

    // load posts to store
    case LOAD_POSTS:
      const filteredPosts = posts.filter(p => (p.deleted !== true))
      return {
        ...state,
        ...objectFromArray(filteredPosts, 'id')
      }

    // add or edit a post
    case ADD_POST:
    case EDIT_POST:
      return {
        ...state,
        [post.id]: post
      };

    // upvote a post
    case UPVOTE_POST:
      return {
        ...state,
        [post_id]: {
          ...state[post_id],
          'voteScore': state[post_id]['voteScore'] + 1
        }
      };

    // downvote a post
    case DOWNVOTE_POST:
      return {
        ...state,
        [post_id]: {
          ...state[post_id],
          'voteScore': state[post_id]['voteScore'] - 1
        }
      };

    // delete a post
    case DELETE_POST:
      var newState = {...state}
      delete newState[post_id]
      return newState;

    // any other action: return all posts
    default:
      return state;
  }
}


// Comments reducers
function comments(state = {}, action) {
  const {comments, comment_id, comment} = action;

  switch (action.type) {

    // load all comments
    case LOAD_COMMENTS:
      return {
        ...state,
        ...objectFromArray(comments, 'id')
      };

    // add or edit a comment
    case ADD_COMMENT:
    case EDIT_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      };

    // upvote a comment
    case UPVOTE_COMMENT:
      return {
        ...state,
        [comment_id]: {
          ...state[comment_id],
          'voteScore': state[comment_id]['voteScore'] + 1
        }
      };

    // downvote a comment
    case DOWNVOTE_COMMENT:
      return {
        ...state,
        [comment_id]: {
          ...state[comment_id],
          'voteScore': state[comment_id]['voteScore'] - 1
        }
      };

    // delete a comment
    case DELETE_COMMENT:
      var newState = {...state}
      delete newState[comment_id]
      return newState;

    // any other action: return all posts
    default:
      return state;
  }

}


// Categories reducers
function categories(state = {}, action) {
  const {categories} = action;

  switch (action.type) {
    // load categories to store
    case LOAD_CATEGORIES:
      return objectFromArray(categories, 'name');

    // any other action: return all categories
    default:
      return state;
  }
}

// Prefrences reducers
function prefrences(state = {}, action) {

  switch (action.type) {
    // set sorting prefrence by date
    case SET_SORTING_PREFERENCE_BY_DATE:
      return {
        ...state,
        ['sorting']: 'byDate'
      };

    // set sorting prefrence by score
    case SET_SORTING_PREFERENCE_BY_SCORE:
      return {
        ...state,
        ['sorting']: 'byScore'
      };

    // any other action: return all prefrences
    default:
      return state;
  }
}


// export all above reducers combined
export default combineReducers({posts, comments, categories, prefrences});
