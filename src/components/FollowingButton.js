import '../styles/Network.css';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';

import doesUserFollow from '../lib/doesUserFollow';
import {
  addFollower,
  addFollowing,
  decreaseFollowerCount,
  increaseFollowerCount,
  removeFollower,
  removeFollowing,
} from '../lib/handleFollow';

export default function FollowingButton({ loggedInUserId, otherUserId }) {
  const [following, setFollowing] = useState(false);

  useEffect(async () => {
    if (!loggedInUserId) return;
    const doesFollow = await doesUserFollow(loggedInUserId, otherUserId);
    setFollowing(doesFollow);
  }, [loggedInUserId]);

  function handleClick() {
    if (following) {
      decreaseFollowerCount(otherUserId);
      removeFollowing(loggedInUserId, otherUserId);
      removeFollower(loggedInUserId, otherUserId);
      setFollowing(false);
    } else {
      increaseFollowerCount(otherUserId);
      addFollowing(loggedInUserId, otherUserId);
      addFollower(loggedInUserId, otherUserId);
      setFollowing(true);
    }
  }

  return (
    <button
      className={following ? 'following follow__button' : 'follow__button'}
      onClick={handleClick}
    >
      <CheckIcon className={following ? 'following' : ''} />
      Follow
      <span className={following ? 'following' : ''}>ing</span>
    </button>
  );
}
