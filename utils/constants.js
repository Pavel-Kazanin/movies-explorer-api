const urlRegex = /^(http|https):\/\/(www.)*([a-z0-9-.]+).(ru|com|org|in|dev|net)([a-zA-Z0-9\-._/~:?#[\]@!$&'()*+,;=])*/;
const idValidate = (schema) => schema.string().hex().alphanum().length(24);
const stringValidate = (schema) => schema.string().required();
const numberValidate = (schema) => schema.number().required();
const urlValidate = (schema) => schema.string().required().pattern(urlRegex);

module.exports = {
  urlRegex,
  idValidate,
  stringValidate,
  numberValidate,
  urlValidate,
};
