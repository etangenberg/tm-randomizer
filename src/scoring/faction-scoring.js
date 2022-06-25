import React from 'react';
import calc from '../round-tiles/calculate-round-tile-score';
import calcBonus from '../bonus-cards/calculate-bonus-cards-score';
import TileElement from '../common/tile-element';

import factions from '../data/factions.json';

const FactionScoring = ({ roundTiles, bonusCards }) => {
  const renderRoundTilesScore = () => (
    <div className="score-type">
      <div className="score-header">Round tile score</div>
      {factions
        .map(({ roundTiles: frt, ...faction })=> ({
          rt_score: calc(roundTiles.map(({ key }) => key), frt), ...faction
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
        .map(({ bonusCards: fbc, ...faction })=> ({
          bc_score: calcBonus(bonusCards.map(({key}) => key), fbc), ...faction
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

  return (
    <div className="faction-scoring">
      {renderRoundTilesScore()}
      {renderBonusCardsScore()}
    </div>
);
};

export default FactionScoring;
