import '../styles/UserProfile.css';
import banner from '../assets/abstract-cosmic-gravity-field-with-2-planets-vector.jpeg';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Avatar } from '@mui/material';
import useAddProfileImage from '../hooks/useAddProfileImage';
export default function UserProfile() {
  const user = useSelector(selectUser);

  // Add user profile img hook
  const { setShowProfileImageModal, showProfileImageModal, ProfileImageModal } =
    useAddProfileImage();

  return (
    <div className="profile__container">
      <div className="profile__container__top">
        <img className="banner__image" src={banner} />

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
      <div className="profile__container__bottom">
        <h2 className="user__display__name">Luke Meadows</h2>
      </div>
    </div>
  );
}
