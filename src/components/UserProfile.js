import '../styles/UserProfile.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Avatar } from '@mui/material';
import useAddImage from '../hooks/useAddImage';
import CreatePost from '../components/CreatePost';
export default function UserProfile() {
  const user = useSelector(selectUser);

  // Add user profile img hook
  const [setShowProfileImageModal, showProfileImageModal, ProfileImageModal] =
    useAddImage('profile');
  const [setShowBannerImageModal, showBannerImageModal, BannerImageModal] =
    useAddImage('banner');
  if (!user.bannerPic) return <h1>Loading...</h1>;
  return (
    <div className="profile__container">
      <div className="user__profile__left">
        <div className="user__profile__left__top">
          <div className="profile__container__top">
            <div
              className="profile__banner"
              onClick={() => setShowBannerImageModal(!showBannerImageModal)}
            >
              {user.bannerPic && (
                <img className="banner__image" src={user.bannerPic} alt="" />
              )}
            </div>

            {/* Display user image if there is one set */}
            {user.profilePic ? (
              <img
                className="profile__image"
                src={user.profilePic}
                alt=""
                onClick={() => setShowProfileImageModal(!showProfileImageModal)}
              />
            ) : (
              <Avatar
                className="profile__image"
                style={{ width: '100px', height: '100px' }}
                onClick={() => setShowProfileImageModal(!showProfileImageModal)}
              />
            )}
          </div>

          {showProfileImageModal && <ProfileImageModal />}
          {showBannerImageModal && <BannerImageModal />}

          <div className="profile__container__bottom">
            <h2 className="user__display__name">
              {user.firstName + ' ' + user.lastName}
            </h2>
          </div>
        </div>
      </div>
      <CreatePost />
    </div>
  );
}
