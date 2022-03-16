import '../styles/Sidebar.css';
import { Avatar } from '@mui/material';
import BannerImage from '../assets/abstract-cosmic-gravity-field-with-2-planets-vector.jpeg';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import useAddProfileImage from '../hooks/useAddProfileImage';

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
  const { setShowProfileImageModal, showProfileImageModal, ProfileImageModal } =
    useAddProfileImage();

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__top">
          <img className="sidebar__top__banner" src={BannerImage} alt="" />
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
              style={{ width: '100px', height: '100px' }}
              onClick={() => setShowProfileImageModal(!showProfileImageModal)}
            />
          )}
          <h2>Welcome, {user.displayName}!</h2>
          <h6>{user.email}</h6>
        </div>
        <div className="sidebar__stats">
          <div className="sidebar__stat">
            <p>Who viewed you</p>
            <p>1,111</p>
          </div>
          <div className="sidebar__stat">
            <p>Views on post</p>
            <p>2,341</p>
          </div>
        </div>
        <div className="sidebar__bottom">
          <h6>Followed Hashtags</h6>
          {topic('react')}
          {topic('webdevelopment')}
          {topic('softwareengineering')}
          {topic('fullstack')}
        </div>
        <button onClick={logout}>logout</button>
      </div>
      {showProfileImageModal && <ProfileImageModal />}
    </>
  );
}
