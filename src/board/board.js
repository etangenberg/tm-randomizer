// import setupMap from './loon-lakes.json';
import setupMap from './base-map.json';
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
  const startIndent = (setupMap.length < 1) || (setupMap[0].length < setupMap[1].length);
  const row0 = startIndent ? 100 : 49;  
  const row1 = startIndent ? 50 : 101;  
  const scale = 0.6;
  const nextHex = 104;
  const nextRow = 79;
  const v = (v, offset = 0) => `${(v + offset) * scale}`;
  const p = (x, y, dx, dy) => `${v(x, dx)} ${v(y, dy)}`; 


  const candidate = [
    [[1,1], [5,7], [6,3]],
    [[3,1], [7,5], [3,6]],
    [[1,3], [6,6], [4,3]],
  ];

  const pick = ([x,y], s) => <circle cx={v(x+50)} cy={v(y+50)} r={s*10*scale}/>
  const getCandidate = ([x,y],can) => (candidate[can].find(([cx, cy]) => (cx === x) && (cy === y)));  

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
        {setupMap.map((row, ri) => row.map((type, colindex) => {
          const pos = [colindex * nextHex + (ri % 2 ? row1 : row0), ri * nextRow];
          return [
            polygon(
              [ri, colindex, type],
              pos
            ),
            getCandidate([ri, colindex], 0) && pick(pos,3),
            getCandidate([ri, colindex],1) && pick(pos,2),
            getCandidate([ri, colindex],2) && pick(pos,1),

          ].filter(Boolean)
        }))}
      </svg>
    </div>
  );
};

export default Board;
