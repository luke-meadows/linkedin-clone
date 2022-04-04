import { useEffect, useState } from 'react';
import UserProfileLink from '../components/UserProfileLink';
import PinDropIcon from '@mui/icons-material/PinDrop';
import GroupIcon from '@mui/icons-material/Group';
import { getUsers } from '../lib/getUser';
import '../styles/Network.css';
import FollowingButton from '../components/FollowingButton';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import FollowerCount from '../components/FollowerCount';
export default function Network() {
  const loggedInUserId = useSelector(selectUser).userId;
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    const users = await getUsers(loggedInUserId);
    setUsers(users);
  }, []);

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
                <div className="followers">
                  <span>
                    <GroupIcon />
                  </span>
                  {/* {user.followerCount} follower
                  
                  {user.followerCount === 1 ? '' : 's'} */}
                  <FollowerCount userId={user.userId} />
                </div>
                <FollowingButton
                  loggedInUserId={loggedInUserId}
                  otherUserId={user.userId}
                  width="80%"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
