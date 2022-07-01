import './nav-bar.css';

const url = 'https://boardgamegeek.com/filepage/104541/terra-mystica-strategy-reference-guide';

const NavBar = ({children}) => (
  <div className="nav-bar">
  <div className="nav-elements">
    {children}
  </div>
  <a className="link" rel="noreferrer" href={url} target="_blank">
    Strategy file
  </a>
</div>
);

export default NavBar;
