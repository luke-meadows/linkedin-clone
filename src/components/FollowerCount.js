import { useEffect, useState } from 'react';
import { db } from '../db/firebase';

export default function FollowerCount({ userId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    const getFollowerCount = db
      .collection('users')
      .doc(userId)
      .onSnapshot((querySnapshot) => {
        setCount(querySnapshot.data().followerCount);
      });
    return () => getFollowerCount();
  }, []);
  return (
    <span>
      {count} follower{count === 1 ? '' : 's'}
    </span>
  );
}
