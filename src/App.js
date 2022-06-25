import React from 'react';
import './App.css';

import generateCards from './bonus-cards/generate-bonus-cards';
import generateTiles from './round-tiles/generate-round-tiles';
import RoundTiles from './round-tiles/component/round-tiles';
import BonusCards from './bonus-cards/bonus-cards';
import FactionScoring from './scoring/faction-scoring';

const App = ()  => {
  const playerCount = 2;
  const usedRoundTiles = generateTiles(6); 
  const usedBonusCards = generateCards(playerCount);

  return (
    <div>
      <RoundTiles roundTiles={usedRoundTiles} />
      <BonusCards bonusCards={usedBonusCards}/>
      <FactionScoring bonusCards={usedBonusCards} roundTiles={usedRoundTiles} />
    </div>
  );
}

export default App;
