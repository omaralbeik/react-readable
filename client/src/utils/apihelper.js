class APIHelper {

  /****************************************************************************/
  /*                                 Methods                                  */
  /****************************************************************************/

  /**
   ** Get all categories.
   */
  static getCategories() {
    return this._getObject(this._CATEGORIES_URL, "categories");
  }

  /**
   ** Get all posts for a category.
   */
  static getCategoryPosts(category_name) {
    return this._getObject(this._CATEGORY_POSTS_URL(category_name));
  }

  /**
   ** Get all posts.
   */
  static getPosts() {
    return this._getObject(this._POSTS_URL);
  }

  /**
   ** Get a post.
   */
  static getPost(post_id) {
    return this._getObject(this._POST_URL(post_id));
  }

  /**
   ** Get all comments for a post.
   */
  static getPostComments(post_id) {
    return this._getObject(this._POST_COMMENTS_URL(post_id));
  }

  /**
   ** Get a comment
   */
  static getComment(comment_id) {
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
   ** Generic private helper function to fetch a json object from server.
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

}

export default APIHelper
