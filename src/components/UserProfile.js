import '../styles/UserProfile.css';

import avatar from '../assets/avatar.jpeg';
import banner from '../assets/abstract-cosmic-gravity-field-with-2-planets-vector.jpeg';
export default function UserProfile() {
  return (
    <div className="profile__container">
      <img className="banner__image" src={banner} />
      <img className="profile__img" src={avatar} alt="" />
      <h2 className="user__display__name">Luke Meadows</h2>
    </div>
  );
}
