import '../styles/ProfileInfo.css';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function ProfileInfo({ isThisLoggedInUserProfile, user }) {
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
          <h6>Bio</h6>
          <p>{user.bio}</p>
        </div>
      )}
      {isThisLoggedInUserProfile && <button>Edit profile</button>}
    </div>
  );
}
