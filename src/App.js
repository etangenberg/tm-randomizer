import React from 'react';
import './App.css';
import createArrray from './common/create-array';
import shuffleArray from './common/shuffle-array';
import roundTiles from './data/round-tiles.json';
import bonusCards from './data/bonus-cards.json';
import factions from './data/factions.json';
import calc from './round-tiles/calculate-round-tile-score';
import TileElement from './round-tiles/component/tile-element';

const App = ()  => {
  const playerCount = 4;
  const roundTileKeys = createArrray(8);
  const bonusCardsKeys = createArrray(10);
  const shuffledRoundTiles = shuffleArray(roundTileKeys);
  const shuffledbonusCardsKeys = shuffleArray(bonusCardsKeys);
  const usedRoundTiles = shuffledRoundTiles.slice(0, 6);
  const usedBonusCards = shuffledbonusCardsKeys.slice(0, playerCount + 3);

  const renderRoundTiles = () => (
    <div className="round-tiles">
    {usedRoundTiles.map(
      (k) => <TileElement
      className="round-tile"
      {...roundTiles.find((rt) => (rt.key === k)) || {}} />)}
    </div>);

  const renderBonusCards = () => (
    <div className="bonus-cards">
    {usedBonusCards.map(
      (k) => <TileElement
      className=" bonus-card"
      {...bonusCards.find((rt) => (rt.key === k)) || {}} />)}
      </div>);


  const renderRoundTilesScore = () => (
    <div className="factions">
      {factions
        .map(({ roundTiles, ...faction })=> ({
          rt_score: calc(usedRoundTiles, roundTiles), ...faction
        }))
        .sort((a, b) => (b.rt_score - a.rt_score))
        .map((faction) => (
          <TileElement {...faction} />))
    // .map((f) => ({
    //   name: f.name,
    //   score: calculateRoundTilesScore(usedRoundTiles, f.roundTiles),
    // }))
    // .sort((a, b) => a.score - b.score)
    // .map(({ name }) => (<p>name</p>));
      }
    </div>
  );
  return (
    <div>
      <p>
        {renderRoundTiles()}
      </p>
      <p>
        {renderBonusCards()}
      </p>
      <p>{renderRoundTilesScore()}</p>
    </div>
  );
}

export default App;
