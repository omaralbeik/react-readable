/**
 * Create an object from given array
 */
export function objectFromArray(arr, key = 'id') {
  if (arr && arr.length) {
    return arr.reduce((v, i) => {
      v[i[key]] = i;
      return v;
    }, {});
  } else {
    return {};
  }

}

/**
 * Create an array from given object
 */
export function arrayFromObject(obj, key = 'id') {
  return Object.keys(obj).map(key => (obj[key]));
}

/**
 * Create a random id
 */
export function guid() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
}

/**
 * Get sorted posts array based on sorting prefrence
 */
export function getSortedPostsArray(posts, sortingPref) {
  const postsArray = arrayFromObject(posts, 'id');
  if (sortingPref) {
    switch (sortingPref) {
      case 'byScore':
        return postsArray.sort((a, b) => (a.voteScore < b.voteScore));
      case 'byDate':
        return postsArray.sort((a, b) => (a.timestamp < b.timestamp));
      default:
        return postsArray;
    }
  } else {
    return postsArray;
  }
}
