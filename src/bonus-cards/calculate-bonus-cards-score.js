const validateInput = (bonusCardsByKey, bonusCardPreference) => {
  if (!Array.isArray(bonusCardsByKey)) { throw new Error('bonusCardsByKey is not an array'); }
  if (typeof bonusCardPreference !== 'object') { throw new Error('bonusCardPreference is not an object'); }
}


const cardCount = 10;

const calculateBonusCardTilesScore = (bonusCardsByKey, bonusCardPreference, config = {}) => {
  validateInput(bonusCardsByKey, bonusCardPreference);
  if (!bonusCardsByKey.length) return undefined;
  const { prefer, dislike } = bonusCardPreference;

  const { weights, maxScore: ms, equalize } = config;
  const { prefer: pW, dislike: dW, neutral: nW } = weights || {};
  const preferW = pW !== undefined ? pW : 1;
  const neutralW = nW !== undefined ? nW : 0;
  const dislikeW = dW !== undefined ? dW : -1 ;
  const maxScore = ms !== undefined ? ms : 10;

  const preferCnt = prefer?.length || 0; 
  const dislikeCnt = dislike?.length || 0;
  const neutralCnt = cardCount - preferCnt - dislikeCnt;
  const equalizer = equalize 
    ? maxScore / (preferCnt * preferW + neutralCnt * neutralW + dislikeCnt * dislikeW)
    : 1;

  const cardWeight = (card) => {
    if (prefer && prefer.includes(card)) return preferW * equalizer;
    if (dislike && dislike.includes(card)) return dislikeW * equalizer;
    return neutralW * equalizer;
  };

  return bonusCardsByKey.reduce(
    (acc, card) => (acc += cardWeight(card)),
    0);
};

export default calculateBonusCardTilesScore;
