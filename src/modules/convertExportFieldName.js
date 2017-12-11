// @flow
export default val => {
  if (typeof val === "string" || val instanceof String) {
    return val
      .replace(/ /g, "-")
      .replace(/\(/g, "")
      .replace(/\)/g, "");
  }
  return val;
};
