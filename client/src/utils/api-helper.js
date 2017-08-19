import {guid} from './helpers';

class APIHelper {

  /****************************************************************************/
  /*                                 Methods                                  */
  /****************************************************************************/

  /**
   ** Get all categories.
   */
  static fetchCategories() {
    return this._getObject(this._CATEGORIES_URL, 'categories');
  }

  /**
   ** Get all posts for a category.
   */
  static fetchCategoryPosts(category_name) {
    return this._getObject(this._CATEGORY_POSTS_URL(category_name));
  }

  /**
   ** Get all posts.
   */
  static fetchPosts() {
    return this._getObject(this._POSTS_URL);
  }

  /**
   ** Create a new post.
   */
  static createPost(author, category, title, body) {
    return this._postObject(this._POSTS_URL, {
      id: guid(),
      timestamp: Date.now(),
      author: author,
      category: category,
      title: title,
      body: body
    });
  }

  /**
   ** edit a post.
   */
  static editPost(post_id, newAuthor, newCategory, newTitle, newBody) {
    return this._putObject(this._POST_URL(post_id), {
      author: newAuthor,
      category: newCategory,
      title: newTitle,
      body: newBody
    });
  }

  /**
   ** Get a post.
   */
  static fetchPost(post_id) {
    return this._getObject(this._POST_URL(post_id));
  }

  /**
   ** Upvote a post.
   */
  static upvotePost(post_id) {
    return this._postObject(this._POST_URL(post_id), {'option': 'upVote'});
  }

  /**
   ** Downvote a post.
   */
  static downvotePost(post_id) {
    return this._postObject(this._POST_URL(post_id), {'option': 'downVote'});
  }

  /**
   ** Delete a post.
   */
  static deletePost(post_id) {
    return this._deleteObject(this._POST_URL(post_id));
  }

  /**
   ** Get all comments for a post.
   */
  static fetchPostComments(post_id) {
    return this._getObject(this._POST_COMMENTS_URL(post_id));
  }

  /**
   ** Create a new comment.
   */
  static createComment(post_id, author, body) {
    return this._postObject(this._COMMENTS_URL, {
      id: guid(),
      timestamp: Date.now(),
      parentId: post_id,
      author: author,
      body: body,
    });
  }

  /**
   ** edit a comment.
   */
  static editComment(comment_id, newAuthor, newBody) {
    return this._putObject(this._COMMENT_URL(comment_id), {
      body: newBody,
      author: newAuthor,
    });
  }

  /**
   ** Get a comment
   */
  static fetchComment(comment_id) {
    return this._getObject(this._COMMENT_URL(comment_id));
  }

  /**
   ** Upvote a comment.
   */
  static upvoteComment(comment_id) {
    return this._postObject(this._COMMENT_URL(comment_id), {'option': 'upVote'});
  }

  /**
   ** Downvote a comment.
   */
  static downvoteComment(comment_id) {
    return this._postObject(this._COMMENT_URL(comment_id), {'option': 'downVote'});
  }

  /**
   ** Delete a comment.
   */
  static deleteComment(comment_id) {
    return this._deleteObject(this._COMMENT_URL(comment_id));
  }

  /****************************************************************************/
  /*                                   URLs                                   */
  /****************************************************************************/

  static get _AUTH_KEY() {
    return "superSecureKey;)";
  }

  static get _BASE_URL() {
    const port = 5001; // Change this to your local server port
    return `http://localhost:${port}/`;
  }

  static get _CATEGORIES_URL() {
    return `${this._BASE_URL}categories/`;
  }

  static _CATEGORY_POSTS_URL(category_name) {
    return `${this._BASE_URL}${category_name}/posts/`;
  }

  static get _POSTS_URL() {
    return `${this._BASE_URL}posts/`;
  }

  static _POST_URL(post_id) {
    return `${this._POSTS_URL}${post_id}/`
  }

  static _POST_COMMENTS_URL(post_id) {
    return `${this._POST_URL(post_id)}comments/`
  }

  static get _COMMENTS_URL() {
    return `${this._BASE_URL}comments/`;
  }

  static _COMMENT_URL(comment_id) {
    return `${this._COMMENTS_URL}${comment_id}/`
  }

  /****************************************************************************/
  /*                                 Helpers                                  */
  /****************************************************************************/

  /**
  ** Generic private helper function to form a server request.
  */
  static _makeRequest(url, method, body = null, keyPath = null) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this._AUTH_KEY);
      var init = {
        method: method,
        headers: headers
      };
      if (body) {
        init.body = JSON.stringify(body)
      }
      fetch(url, init).then((response) => {
        return response.text().then(text => {
          return text
            ? JSON.parse(text)
            : {}
        });
      }).then((data) => {
        if (keyPath) {
          resolve(data[keyPath]);
        } else {
          resolve(data);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   ** Generic private helper function to get a json object from server.
   */
  static _getObject(url, keyPath = null) {
    return this._makeRequest(url, 'GET', null, keyPath : keyPath);
  }

  /**
  ** Generic private helper function to post a json object from server.
   */
  static _postObject(url, body, keyPath = null) {
    return this._makeRequest(url, 'POST', body, keyPath : keyPath);
  }

  /**
   ** Generic private helper function to delete an object from server.
   */
  static _deleteObject(url, keyPath = null) {
    return this._makeRequest(url, 'DELETE', null, keyPath : keyPath);
  }

  /**
   ** Generic private helper function to edit an object from server.
   */
   static _putObject(url, body, keyPath = null) {
     return this._makeRequest(url, 'PUT', body, keyPath : keyPath);
   }

}

export default APIHelper
