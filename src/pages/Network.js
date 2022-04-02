import { useEffect, useState } from 'react';
import UserProfileLink from '../components/UserProfileLink';
import PinDropIcon from '@mui/icons-material/PinDrop';
import GroupIcon from '@mui/icons-material/Group';
import { getUsers } from '../lib/getUser';
import '../styles/Network.css';
export default function Network() {
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    const users = await getUsers();
    setUsers(users);
  }, []);
  return (
    <div className="network__container">
      {users?.map((user) => {
        return (
          <div className="profile">
            <div className="profile__top__section">
              <img className="profile__banner" src={user.bannerImage} alt="" />
              <img className="profile__picture" src={user.profilePic} alt="" />
            </div>
            <div className="bottom__section">
              <div className="username">
                <UserProfileLink user={user} />
              </div>
              <div className="info">
                <div className="location">
                  <span>
                    <PinDropIcon />
                  </span>
                  London
                </div>
                <p className="followers">
                  <span>
                    <GroupIcon />
                  </span>
                  200 followers
                </p>
                <button className="follow__button">Follow</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
