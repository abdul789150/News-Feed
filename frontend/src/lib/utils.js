function getCleanDescription(str) {
  return str?.slice(0, 800).replace(/(<([^>]+)>)/gi, ' ');
}

function getFormattedDate(dateStr) {
  let options = { year: 'numeric', month: 'short', day: 'numeric' };
  let date_obj = new Date(dateStr);

  return date_obj.toLocaleDateString('en-us', options);
}


module.exports = {
  getCleanDescription,
  getFormattedDate
};
