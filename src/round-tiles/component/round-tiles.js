import React from 'react';
import TileElement from '../../common/tile-element';

const RoundTiles = ({ roundTiles, onClick }) => (
  <div className="round-tiles">
    {roundTiles.map(
      (k, index) => (
        <div className="round" key={k.id}>
          <div className="round-name">{`Round ${index+1}`}</div>
          <TileElement
            className="round-tile"
            onClick={() => onClick && onClick(index, k)}
            {...k || {}}
          />
        </div>
      ))
    }
  </div>
);

export default RoundTiles;
