import '../styles/Sidebar.css';
import { Avatar } from '@mui/material';
import BannerImage from '../assets/abstract-cosmic-gravity-field-with-2-planets-vector.jpeg';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import useAddImage from '../hooks/useAddImage';

export default function SideBar({ logout }) {
  const user = useSelector(selectUser);
  const topic = (topic) => {
    return (
      <div className="topic__container">
        <div className="hashtag">#</div>
        <div className="topic__text">{topic}</div>
      </div>
    );
  };

  // Add user profile img hook
  const [setShowProfileImageModal, showProfileImageModal, ProfileImageModal] =
    useAddImage('profile');
  const [setShowBannerImageModal, showBannerImageModal, BannerImageModal] =
    useAddImage('banner');

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__top">
          <div
            className="sidebar__top__banner"
            onClick={() => setShowBannerImageModal(!showBannerImageModal)}
          >
            {user.bannerPic && <img src={user.bannerPic} alt="" />}
          </div>

          {user.profilePic ? (
            <img
              className="sidebar__profile__img"
              src={user.profilePic}
              alt=""
              onClick={() => setShowProfileImageModal(!showProfileImageModal)}
            />
          ) : (
            <Avatar
              className="sidebar__profile__img"
              style={{
                width: '60px',
                height: '60px',
                cursor: 'pointer',
                border: '3px solid white',
              }}
              onClick={() => setShowProfileImageModal(!showProfileImageModal)}
            />
          )}
          <h2>Welcome, {user.displayName}!</h2>
          <h6>{user.email}</h6>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {showProfileImageModal && <ProfileImageModal />}
      {showBannerImageModal && <BannerImageModal />}
    </>
  );
}
