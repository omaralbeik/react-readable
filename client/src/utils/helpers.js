export function objectFromArray(arr, key='id') {
  return arr.reduce((v, i) => {
    v[i[key]] = i;
    return v;
  }, {});
}

export function arrayFromObject(obj, key='id') {
  return Object.keys(obj).map(key => (obj[key]));
}
