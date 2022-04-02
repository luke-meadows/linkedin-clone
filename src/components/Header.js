import '../styles/Header.css';
import HeaderOption from './HeaderOption';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Search from './Search';
import DisabledOverlay from './DisabledOverlay';
import { selectDisableScreen } from '../features/disableScreen';
import NetworkIcon from '@mui/icons-material/ConnectWithoutContact';
export default function Header() {
  // Current logged in user
  const loggedInUser = useSelector(selectUser);
  // Screen is disabled with modal popup. Triggered from modal components.
  const isScreenDisabled = useSelector(selectDisableScreen);

  return (
    <div className="header">
      {isScreenDisabled && <DisabledOverlay />}
      <div className="header__container">
        <div className="header__left">
          <Link to="/">
            <h1 className="logo">
              Bounce<span>.</span>
            </h1>
          </Link>
        </div>
        <div className="header__right">
          <Search />
          <HeaderOption Icon={NetworkIcon} url="/profile" header="Network" />

          {loggedInUser && (
            <HeaderOption avatar={loggedInUser.profilePic} url="/profile" />
          )}
        </div>
      </div>
    </div>
  );
}
