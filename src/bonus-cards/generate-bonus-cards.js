import generateShuffledKeys from '../common/generate-shuffled-keys';

const generateCards = (playerCount) => {
  return generateShuffledKeys(playerCount + 3, 10)
};

export default generateCards;
