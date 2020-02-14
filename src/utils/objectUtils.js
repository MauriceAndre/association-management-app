export const excludeKeys = function(obj, keys) {
  obj = { ...obj };

  keys.forEach(key => delete obj[key]);

  return obj;
};

export default {
  excludeKeys
};
