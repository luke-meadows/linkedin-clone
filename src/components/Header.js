import '../styles/Header.css';
import HeaderOption from './HeaderOption';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Search from './Search';
import DisabledOverlay from './DisabledOverlay';
import { selectDisableScreen } from '../features/disableScreen';
import NetworkIcon from '@mui/icons-material/ConnectWithoutContact';
import PersonIcon from '@mui/icons-material/Person';
import AddImageModal from './AddImageModal';
import { selectAddPhoto } from '../features/addPhoto';
export default function Header() {
  // Current logged in user
  const loggedInUser = useSelector(selectUser);
  // Screen is disabled with modal popup. Triggered from modal components.
  const isScreenDisabled = useSelector(selectDisableScreen);
  const addPhoto = useSelector(selectAddPhoto);
  console.log(addPhoto);
  return (
    <>
      {isScreenDisabled && <DisabledOverlay />}
      {addPhoto.showModal && <AddImageModal imageToBeUpdated="profile" />}
      <div className="header">
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
            <HeaderOption Icon={NetworkIcon} url="/network" header="Network" />
            <HeaderOption Icon={PersonIcon} url="/profile" header="Profile" />

            {/* {loggedInUser && (
            <HeaderOption avatar={loggedInUser.profilePic} url="/profile" />
          )} */}
          </div>
        </div>
      </div>
    </>
  );
}
