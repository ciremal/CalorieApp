const roundNumbers = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export default roundNumbers;
