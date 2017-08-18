export function objectFromArray(arr, key='id') {
  if (arr && arr.length) {
    return arr.reduce((v, i) => {
      v[i[key]] = i;
      return v;
    }, {});
  } else {
    return {};
  }

}

export function arrayFromObject(obj, key='id') {
  return Object.keys(obj).map(key => (obj[key]));
}
