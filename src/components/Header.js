import '../styles/Header.css';
import HeaderOption from './HeaderOption';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Search from './Search';
export default function Header() {
  const loggedInUser = useSelector(selectUser);
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left">
          <Link to="/">
            <h1 className="logo">
              Tattle<span>.</span>
            </h1>
          </Link>
        </div>
        <div className="header__right">
          <Search />
          {loggedInUser && (
            <HeaderOption avatar={loggedInUser.profilePic} url="/profile" />
          )}
        </div>
      </div>
    </div>
  );
}
