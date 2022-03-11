import '../styles/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import NetworkIcon from '@mui/icons-material/ConnectWithoutContact';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HeaderOption from './HeaderOption';
import avatar from '../assets/avatar.jpeg';
export default function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt=""
        />
        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption Icon={HomeIcon} header="Home" />
        <HeaderOption Icon={NetworkIcon} header="Network" />
        <HeaderOption Icon={MessageIcon} header="Messaging" />
        <HeaderOption Icon={NotificationsIcon} header="Notifications" />
        <HeaderOption avatar={avatar} header="Profile" />
      </div>
    </div>
  );
}
