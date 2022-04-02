import { useEffect, useState } from 'react';
import UserProfileLink from '../components/UserProfileLink';
import PinDropIcon from '@mui/icons-material/PinDrop';
import GroupIcon from '@mui/icons-material/Group';
import CheckIcon from '@mui/icons-material/Check';
import { getUsers } from '../lib/getUser';
import '../styles/Network.css';
export default function Network() {
  const [following, setFollowing] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    const users = await getUsers();
    setUsers(users);
  }, []);
  useEffect(() => {
    console.log(following);
  }, [following]);
  return (
    <div className="network__container">
      {users?.map((user) => {
        return (
          <div key={user.userId} className="profile">
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
                <button
                  className={
                    following ? 'following follow__button' : 'follow__button'
                  }
                  onClick={() => setFollowing(!following)}
                >
                  <CheckIcon className={following ? 'following' : ''} />
                  Follow
                  <span className={following ? 'following' : ''}>ing</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
