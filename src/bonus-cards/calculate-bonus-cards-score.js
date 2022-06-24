const validateInput = (bonusCardsByKey, bonusCardPreference) => {
  if (!Array.isArray(bonusCardsByKey)) { throw new Error('bonusCardsByKey is not an array'); }
  if (typeof bonusCardPreference !== 'object') { throw new Error('bonusCardPreference is not an object'); }
}


const calculateBonusCardTilesScore = (bonusCardsByKey, bonusCardPreference, weights) => {
  validateInput(bonusCardsByKey, bonusCardPreference);
  if (!bonusCardsByKey.length) return undefined;
  const {prefer: pw, dislike: dw } = weights || {};
  const preferWeight = pw !== undefined ? pw : 1;
  const dislikeWeight = dw !== undefined ? dw : 1;
  const { prefer, dislike } = bonusCardPreference;

  const preferCount = prefer ? bonusCardsByKey.reduce((acc, card) => (acc += prefer.includes(card) ? preferWeight : 0), 0) : 0;
  const dislikeCount = dislike ? bonusCardsByKey.reduce((acc, card) => (acc -= dislike.includes(card) ? dislikeWeight : 0), 0) : 0;
  return preferCount + dislikeCount
};

export default calculateBonusCardTilesScore;
