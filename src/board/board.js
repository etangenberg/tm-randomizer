import setupMap from './loon-lakes.json';
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

const Board = () => {
  const scale = 0.6;
  const v = (v, offset = 0) => `${(v + offset) * scale}`;
  const p = (x, y, dx, dy) => `${v(x, dx)} ${v(y, dy)}`; 

  const defHex = [[50, 0], [100, 25], [100, 75], [50, 100], [0, 75], [0, 25]];
  const hex = (dx, dy) => defHex.map(([x,y]) => p(x, y, dx, dy)).join(',') ;

  const polygon = ([r,c, type], [dx, dy], className) => (
    <polygon key={`${r}-${c}`} points={hex(dx, dy)} 
      className="board-hex"
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
      xlinkHref={`images/terrain/terrain${upperCase(id)}.png`}
    />
  </pattern>
);

  return (
    <div className="game-board">
      <div className="game-board-title">Basic board</div>
      <svg width="100%" height="800px" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" >
        <defs>
          {terrains.map(terrainDef)}
        </defs>
        {setupMap.map((row, ri) => row.map((type, colindex) => polygon([ri, colindex, type], [colindex * 100 + (ri % 2 ? 50 : 100), ri * 75])))}
      </svg>
    </div>
  );
};

export default Board;
