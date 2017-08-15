class APIHelper {

  /****************************************************************************/
  /*                                 Methods                                  */
  /****************************************************************************/

  /**
   ** Get all categories.
   */
  static fetchCategories() {
    return this._getObject(this._CATEGORIES_URL, "categories");
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
   ** Get all comments for a post.
   */
  static fetchPostComments(post_id) {
    return this._getObject(this._POST_COMMENTS_URL(post_id));
  }

  /**
   ** Get a comment
   */
  static fetchComment(comment_id) {
    return this._getObject(this._COMMENT_URL(comment_id));
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
   ** Generic private helper function to get a json object from server.
   */
  static _getObject(url, keyPath = null) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this._AUTH_KEY);

      var init = {
        method: 'GET',
        headers: headers
      };

      fetch(url, init).then((response) => {
        return response.json();
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
  ** Generic private helper function to post a json object from server.
   */
  static _postObject(url, body, keyPath = null) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this._AUTH_KEY);
      var init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      };

      fetch(url, init).then((response) => {
        return response.json();
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

}

export default APIHelper
