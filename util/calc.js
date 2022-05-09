const calcEPB = (busRemitted, collection) => {
  return busRemitted ? (collection / busRemitted).toFixed(0) : 0;
};

const calcEPKM = (optedKM, collection) => {
  return optedKM ? (collection / optedKM).toFixed(2) : 0;
};

const calcAchievement = (target, collection) => {
  return target ? ((collection / target) * 100).toFixed(2) : 0;
};

const calcEPL = (collection, dieselQty) => {
  return dieselQty ? (collection / dieselQty).toFixed(0) : 0;
};

const calcKMPL = (optedKM, dieselQty) => {
  return dieselQty ? (optedKM / dieselQty).toFixed(2) : 0;
};

const convertToLakhs = (val) => {
  return (val / 100000).toFixed(2);
};
export {
  calcAchievement,
  calcEPB,
  calcEPKM,
  calcEPL,
  calcKMPL,
  convertToLakhs,
};
