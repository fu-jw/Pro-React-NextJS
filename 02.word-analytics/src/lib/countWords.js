export const countWords = (text) => {
  var cn = 0;
  if (text.match(/[\u4e00-\u9fa5]/g) != null) {
    cn = text.match(/[\u4e00-\u9fa5]/g).length;
  }
  var total = cn + text.length;
  return { total, cn };
};
