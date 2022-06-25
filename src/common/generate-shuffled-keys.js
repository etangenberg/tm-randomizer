import createArrray from "./create-array";
import shuffleArray from "./shuffle-array";

const generateShuffledKeys = (keep, total) => {
  if (keep > total) throw new Error('total cannot be less than keep');

  const keys = createArrray(total);
  const shuffledKeys = shuffleArray(keys);
  return shuffledKeys.slice(0, keep);
};

export default generateShuffledKeys;
