const getDate = () => {
  return new Date().toLocaleDateString("en-GB").split("/").reverse().join("-");
};

export default getDate;
