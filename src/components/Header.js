import '../styles/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import NetworkIcon from '@mui/icons-material/ConnectWithoutContact';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HeaderOption from './HeaderOption';
import avatar from '../assets/avatar.jpeg';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left">
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt=""
            />
          </Link>
          <div className="header__search">
            <SearchIcon />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="header__right">
          <HeaderOption Icon={HomeIcon} url="/" header="Home" />
          <HeaderOption Icon={NetworkIcon} url="/" header="Network" />
          <HeaderOption Icon={MessageIcon} url="/" header="Messaging" />
          <HeaderOption
            Icon={NotificationsIcon}
            url="/"
            header="Notifications"
          />
          <HeaderOption avatar={avatar} url="/profile" header="Profile" />
        </div>
      </div>
    </div>
  );
}
