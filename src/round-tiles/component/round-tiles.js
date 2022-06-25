import React from 'react';
import TileElement from '../../common/tile-element';

const RoundTiles = ({ roundTiles }) => (
  <div className="round-tiles">
    {roundTiles.map(
      (k, index) => (
        <div className="round">
          <div className="round-name">{`Round ${index+1}`}</div>
          <TileElement
            className="round-tile"
            {...k || {}}
          />
        </div>
      ))
    }
  </div>
);

export default RoundTiles;
