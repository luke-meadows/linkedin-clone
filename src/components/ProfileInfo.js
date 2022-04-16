import '../styles/ProfileInfo.css';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEditProfileModal,
  toggleEditProfileModal,
} from '../features/editProfileModal';

export default function ProfileInfo({ isThisLoggedInUserProfile, user }) {
  const dispatch = useDispatch();

  return (
    <div className="profile__info__container">
      <h6>Profile Info</h6>
      {user.location && (
        <div className="profile__location">
          <span>
            <PinDropIcon />
          </span>
          {user.location}
        </div>
      )}
      {user.bio && (
        <div className="bio">
          <p>{user.bio}</p>
        </div>
      )}
      {isThisLoggedInUserProfile && (
        <button
          onClick={() => {
            dispatch(toggleEditProfileModal(true));
          }}
        >
          Edit profile
        </button>
      )}
    </div>
  );
}
