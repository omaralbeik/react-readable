import { combineReducers } from 'redux'
import {objectFromArray} from '../utils/helpers'

import {
  LOAD_POSTS,
  UPVOTE_POST,
  DOWNVOTE_POST,
  DELETE_POST,

  LOAD_COMMENTS,
  ADD_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,

  LOAD_CATEGORIES,
} from '../actions'


function posts(state = {}, action) {
  const {posts, post_id} = action;

  switch (action.type) {

    // load posts to store
    case LOAD_POSTS:
      const filteredPosts = posts.filter(p => (p.deleted !== true))
      return {
        ...state,
        ...objectFromArray(filteredPosts, 'id')
      }

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


function comments(state = {}, action) {
  const {comments, comment_id, comment} = action;

  switch (action.type) {

    // load all comments
    case LOAD_COMMENTS:
      return {
        ...state,
        ...objectFromArray(comments, 'id')
      };

    // add a comment
    case ADD_COMMENT:
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

    // edit a comment
    case EDIT_COMMENT:
      return {
        ...state,
        [comment.id]: comment
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

export default combineReducers({posts, comments, categories});
