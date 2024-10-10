const convertDate = ({ locale = [], date = Date.now(), ...options } = {}) =>
  new Intl.DateTimeFormat(locale, options).format(date);
export default convertDate;
