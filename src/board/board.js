import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";

import setupMap from './base-map.json';
import factions from '../data/factions.json';

import "./board.css";

const abbr = {
  d: 'desert',
  f: 'forest',
  l: 'lakes',
  m: 'mountains',
  p: 'plains',
  s: 'swamp',
  w: 'wasteland',
  r: 'river'
};
const terrains = [
  'desert',
  'forest',
  'lakes',
  'mountains',
  'plains',
  'swamp',
  'wasteland',
  'river'
];

const Board = ({ map }) => {
  const { faction } = useParams(); 
  const factionData = factions.find((f) => f.id === faction);
  const startIndent = (map.length < 1) || (map[0].length < map[1].length);
  const row0 = startIndent ? 100 : 50;  
  const row1 = startIndent ? 50 : 100;  
  const scale = 0.6;
  const nextHex = 100;
  const nextRow = 75;
  const v = (v, offset = 0) => `${(v + offset) * scale}`;
  const p = (x, y, dx, dy) => `${v(x, dx)} ${v(y, dy)}`; 

  // const candidate = [
  //   [[1,1], [5,7], [6,3]],
  //   [[3,1], [7,5], [3,6]],
  //   [[1,3], [6,6], [4,3]],
  // ];

  const priorityClass = ['prior4', 'prior3', 'prior2', 'prior1'];
  const pick = ([c, r], s) => {
    const [x,y] = getPos(c,r); 
    return (
      <circle
        cx={v(x + 50)}
        cy={v(y + 50)}
        r={s * 10 * scale}
        className={priorityClass[s]}
      />
    )
  };

  const defHex = [
    [50, 0],
    [100, 25],
    [100, 75],
    [50, 100],
    [0, 75],
    [0, 25],
  ];
  const hex = (dx, dy) => defHex.map(([x,y]) => p(x, y, dx, dy)).join(',') ;

  const polygon = ([r,c, type], [dx, dy], className) => (
    <polygon key={`${r}-${c}`} points={hex(dx, dy)} 
      className={["board-hex", abbr[type]].join(' ')}
      strokeWidth="1"
      fill={`url(#${abbr[type]})`}
    />
  );

const upperCase = (string) => string && (string.charAt(0).toUpperCase() + string.slice(1));

const terrainDef = (id) => (
  <pattern
    id={id}
    height="140%"
    width="140%"
    patternContentUnits="objectBoundingBox"
    x="-0.1"
    y="-0.1"
  >
    <image
      height="1.2"
      width="1.2"
      preserveAspectRatio="none"
      xlinkHref={`../images/terrain/terrain${upperCase(id)}.png`}
    />
  </pattern>
);

  const getPos = (xi, yi) => [xi * nextHex + (yi % 2 ? row1 : row0), yi * nextRow];
  const renderHexes = (map, types) => (
    map.map((row, ri) => row.map((type, ci) => (
      (!types || !types.length || !types.includes(type)) 
        ? polygon(
          [ri, ci, type],
          getPos(ci, ri)
        )
        : null))));

  const renderStartPositions = (startPositions = []) => (
    startPositions
      .map((prio, index) => prio.map((pos) => pick(pos, 3 - index) )));

  return (
    <div className="game-board">
      <div className="game-board-title">Basic board</div>
      <svg width="100%" height="800px" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" >
        <defs>
          {terrains.map(terrainDef)}
        </defs>
        {renderHexes(map, Object.keys(abbr).filter(t => (t !== 'r')) )}
        {renderHexes(map, ['r'])}
        {renderStartPositions(factionData.startPositions)}
      </svg>
    </div>
  );
};

Board.propTypes = {
  map: PropTypes.array,
  faction: PropTypes.string,
};

Board.defaultProps = {
  map: setupMap,
};

export default Board;
