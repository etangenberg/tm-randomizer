import React from 'react';
import './App.css';
import createArrray from './common/create-array';
import shuffleArray from './common/shuffle-array';
import roundTiles from './data/round-tiles.json';
import bonusCards from './data/bonus-cards.json';
import factions from './data/factions.json';
import calc from './round-tiles/calculate-round-tile-score';
import calcBonus from './bonus-cards/calculate-bonus-cards-score';
import TileElement from './round-tiles/component/tile-element';

const App = ()  => {
  const playerCount = 2;
  const roundTileKeys = createArrray(8);
  const bonusCardsKeys = createArrray(10);
  const shuffledRoundTiles = shuffleArray(roundTileKeys);
  const shuffledbonusCardsKeys = shuffleArray(bonusCardsKeys);
  const usedRoundTilesKeys = shuffledRoundTiles.slice(0, 6);
  const usedBonusCardsKeys = shuffledbonusCardsKeys.slice(0, playerCount + 3);
 
  const usedRoundTiles = usedRoundTilesKeys.map((key) => roundTiles.find((t) => t.key === key));
  const usedBonusCards = usedBonusCardsKeys.map((key) => bonusCards.find((t) => t.key === key));
  const renderRoundTiles = () => (
    <div className="round-tiles">
    {usedRoundTiles.map(
      (k, index) => (
        <div className="round">
          <div className="round-name">{`Round ${index+1}`}</div>
          <TileElement
            className="round-tile"
            {...k || {}} />
        </div>
      ))}
    </div>);

  const renderBonusCards = () => (
    <div className="bonus-cards">
    {usedBonusCards.map(
      (k) => <TileElement
      className=" bonus-card"
      {...k || {}} />)}
      </div>);


  const renderRoundTilesScore = () => (
    <div className="score-type">
      <div className="score-header">Round tile score</div>
      {factions
        .map(({ roundTiles, ...faction })=> ({
          rt_score: calc(usedRoundTilesKeys, roundTiles), ...faction
        }))
        .sort((a, b) => (b.rt_score - a.rt_score))
        .map((faction) => (
          <div>
            <div className="score">{faction.rt_score}</div>
            <TileElement {...faction} />
          </div>
        ))
      }
    </div>
  );

  const renderBonusCardsScore = () => (
    <div className="score-type">
      <div className="score-header">Bonus cards score</div>
      {factions
        .map(({ bonusCards, ...faction })=> ({
          bc_score: calcBonus(usedBonusCardsKeys, bonusCards), ...faction
        }))
        .sort((a, b) => (b.bc_score - a.bc_score))
        .map((faction) => (
          <div>
            <div className="score">{faction.bc_score}</div>
            <TileElement {...faction} />
          </div>
        ))
      }
    </div>
  );

  const renderSetup = () => (
    <div className="setup">
      RoundTiles:
      {usedRoundTiles.map((r) => r.id).join(', ')}
      BonusCards:
      {usedBonusCards.map((c)=> c.id).join(', ')}
    </div>
  );
  return (
    <div>
      {renderRoundTiles()}
      {renderBonusCards()}
      {renderSetup()}
      <div className="faction-scoring">
        {renderRoundTilesScore()}
        {renderBonusCardsScore()}
      </div>
    </div>
  );
}

export default App;
