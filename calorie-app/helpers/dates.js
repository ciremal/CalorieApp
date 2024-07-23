export const dateToday = new Date()
  .toLocaleDateString("en-GB")
  .split("/")
  .reverse()
  .join("-");

export const dateYesterday = new Date(
  new Date().setDate(new Date().getDate() - 1)
)
  .toLocaleDateString("en-GB")
  .split("/")
  .reverse()
  .join("-");

export const formatDate = (date) => {
  return date.toLocaleDateString("en-GB").split("/").reverse().join("-");
};

export const getAge = (DOB) => {
  const today = new Date();
  const dob = new Date(DOB);

  var age = today.getFullYear() - dob.getFullYear();
  var m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};
