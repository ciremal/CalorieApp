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
