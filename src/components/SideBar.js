import '../styles/Sidebar.css';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { showModal } from '../features/addPhoto';
import { toggleDisableScreen } from '../features/disableScreen';

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

  const dispatch = useDispatch();
  function handleImageClick(e) {
    dispatch(
      showModal({
        showModal: true,
        photoToBeUpdated: e.currentTarget.dataset.imagetype,
      })
    );
  }

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__top">
          <div
            className="sidebar__top__banner"
            data-imagetype="banner"
            onClick={handleImageClick}
          >
            {user.bannerImage && <img src={user.bannerImage} alt="" />}
          </div>

          {user.profilePic ? (
            <img
              className="sidebar__profile__img"
              data-imagetype="profile"
              src={user.profilePic}
              alt=""
              onClick={handleImageClick}
            />
          ) : (
            <Avatar
              className="sidebar__profile__img"
              onClick={handleImageClick}
              data-imagetype="profile"
              style={{
                width: '60px',
                height: '60px',
                cursor: 'pointer',
                border: '3px solid white',
              }}
            />
          )}
          <h2>Welcome, {user.displayName}!</h2>
          <h6>{user.email}</h6>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
