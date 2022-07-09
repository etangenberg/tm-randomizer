import createArrray from "./create-array";
import shuffleArrayDefault from "./shuffle-array";

const generateShuffledKeys = (keep, total, config = {}) => {
  const { 
    validRoundTile: valid,
    shuffleArray,
  } = config;
  if (keep > total) throw new Error('total cannot be less than keep');

  const keys = createArrray(total);
  const shuffledKeys = shuffleArray ? shuffleArray(keys) : shuffleArrayDefault(keys);
  
  const keeps = [];

  while (keeps.length < keep) {
    const current = shuffledKeys.splice(0,1)[0];
    if (valid === undefined || valid(keeps.length + 1, current)) {
      keeps.push(current);
    }
  }
  
  return keeps;
};

export default generateShuffledKeys;
