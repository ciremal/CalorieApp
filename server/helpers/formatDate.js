export const formatDate = (date) => {
  return date.toLocaleDateString("en-GB").split("/").reverse().join("-");
};
